import express from "express";
import multer from "multer";
import { Dispute } from "../models/dispute.model.js";
import { upload } from "../middleware/multer.moddleware.js";
const router = express.Router();



// NEW DISPUTE
router.post("/", upload.fields([{ name: "equifax_report", maxCount: 1 },
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
            experian_letter,
            trans_union_letter,
            equifax_letter
        } = req.body;

        if (!email || !reason || !letter_name) {
            return res.status(400).json({ message: "email reason and letter name is required" });
        }


        if (!req.files.equifax_report || !req.files.experian_report || !req.files.transUnion_report) {
            return res.status(400).json({ message: "All report files are required." });
        }



        const equifax_report = req.files.equifax_report[0].path.replace(/\\/g, '/');
        const experian_report = req.files.experian_report[0].path.replace(/\\/g, '/');
        const transUnion_report = req.files.transUnion_report[0].path.replace(/\\/g, '/');



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
            experian_letter,
            trans_union_letter,
            equifax_letter
        });

        res.status(200).json({ message: "Dispute created successfully", newDispute });
    } catch (err) {

        res.status(500).json(err.message);
    }
});

// GET ALL OF THE USER DISPUTES
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

//GET ALL THE DISPUTE

router.get('/all', async (req, res) => {
    try {
        const disputes = await Dispute.find();
        if (!disputes) {
            return res.status(404).json({ message: "disputes not found" })
        }
        return res.status(200).json({ message: "all the disputes", data: disputes })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

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
