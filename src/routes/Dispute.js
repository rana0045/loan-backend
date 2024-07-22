import express from "express";
import multer from "multer";
import { Dispute } from "../models/dispute.model.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const user = req.body.email;
        cb(null, `${user}-${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// NEW DISPUTE
router.post("/", upload.fields([
    { name: "equifax_report", maxCount: 1 },
    { name: "experian_report", maxCount: 1 },
    { name: "transUnion_report", maxCount: 1 },
]), async (req, res) => {
    try {
        const {
            email,
            equifax,
            trans_union,
            experian,
            reason,
            credit_furnisher,
            instruction,
            letter_name,
            account_number,
            equifax_account,
            experian_account,
            transUnion_account,
        } = req.body;

        const equifax_report = req.files.equifax_report[0].path;
        const experian_report = req.files.experian_report[0].path;
        const transUnion_report = req.files.transUnion_report[0].path;

        const newDispute = await Dispute.create({
            email,
            equifax_report,
            experian_report,
            transUnion_report,
            equifax,
            trans_union,
            experian,
            reason,
            credit_furnisher,
            instruction,
            letter_name,
            account_number,
            equifax_account,
            experian_account,
            transUnion_account,
        });

        res.status(201).json({ message: "Dispute created successfully", newDispute });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// GET ALL DISPUTES
router.get("/", async (req, res) => {
    const { email } = req.query;
    try {
        const dispute = await Dispute.find({ email: email })
        if (!dispute) {
            return res.status(404).json({ message: "Dispute not found" });
        }

        return res.status(200).json({ message: "all the disputes", data: dispute });
    } catch (error) {
        return res.status(500).json({ message: "Error getting disputes", error: error.message });
    }
});

// GET SPECIFIC DISPUTE
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const dispute = await Dispute.findById(id)

        if (!dispute) {
            res.status(404).json({ message: "Dispute not found" });
            return;
        }

        res.status(200).json(dispute);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// UPDATE DISPUTE
router.put("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const updatedDispute = await Dispute.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Run model validation on update
        });

        if (!updatedDispute) {
            res.status(404).json({ message: "Dispute not found" });
            return;
        }

        res.status(200).json(updatedDispute);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// DELETE DISPUTE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const dispute = await Dispute.findByIdAndDelete(id);

        if (!dispute) {
            res.status(404).json({ message: "Dispute not found" });
            return;
        }


        res.status(200).json({ message: "Dispute deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);

    }
});

export default router;
