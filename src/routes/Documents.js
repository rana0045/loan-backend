import express from "express";
import { Documents } from "../models/documents.model.js";
import { upload } from "../middleware/multer.moddleware.js";
const router = express.Router();


// NEW DOC
router.post("/", upload.fields([{ name: "photo_ID", maxCount: 1 }, { name: "proof_of_address", maxCount: 1 },]), async (req, res) => {
    const PhotoID_path = req.files.photo_ID[0].path.replace(/\\/g, '/')
    const prof_of_address_path = req.files.proof_of_address[0].path.replace(/\\/g, '/')
    console.log(req.files.photo_ID);

    const photo_ID = PhotoID_path;
    const proof_of_address = prof_of_address_path
    const email = req.body.email;
    const user_agreement_freeze = req.body.user_agreement_freeze;
    const consumer_office_freeze = req.body.consumer_office_freeze;
    const lexis_nexis_freeze = req.body.lexis_nexis_freeze;
    const teletrack_freeze = req.body.teletrack_freeze;
    const boompay = req.body.boompay; 9
    const kikoff = req.body.kikoff;
    const self = req.body.self;
    const creditstrong = req.body.creditstrong;
    const experian = req.body.experian;
    const credit = req.body.credit;
    const innovice = req.body.innovice;
    const clarityservices = req.body.clarityservices;
    const checksystems = req.body.checksystems;
    const sagestreamilc = req.body.sagestreamilc;
    const smartcredit = req.body.smartcredit;

    try {
        const newDocs = await Documents.create({
            email: email,
            photo_ID: photo_ID,
            proof_of_address: proof_of_address,
            user_agreement_freeze: user_agreement_freeze,
            consumer_office_freeze: consumer_office_freeze,
            lexis_nexis_freeze: lexis_nexis_freeze,
            teletrack_freeze: teletrack_freeze,
            boompay: boompay,
            kikoff: kikoff,
            self: self,
            creditstrong: creditstrong,
            experian: experian,
            credit: credit,
            innovice: innovice,
            clarityservices: clarityservices,
            checksystems: checksystems,
            sagestreamilc: sagestreamilc,
            smartcredit: smartcredit,
        });
        res.status(201).json({ message: "Document created successfully", newDocs });
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// GET ALL DOCS
router.get("/", async (req, res) => {
    const email = req.query.email;
    try {
        let docs;
        if (email) {
            docs = await Documents.find({ email: email });
        } else {
            docs = await Documents.find();
        }
        res.status(200).json(docs);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET SPECIFIC DOC
router.get("/:email", async (req, res) => {
    try {
        const doc = await Documents.findOne({ email: req.params.email });
        res.status(200).json(doc);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE DOCUMENT
router.put("/:email", upload.fields([{ name: "photo_ID", maxCount: 1 }, { name: "proof_of_address", maxCount: 1 },]), async (req, res) => {

    if (req.files) {
        if ("photo_ID" in req.files) {
            req.body.photo_ID = req.files.photo_ID[0].path;
        }
        if ("proof_of_address" in req.files) {
            req.body.proof_of_address = req.files.proof_of_address[0].path;
        }
    }

    const email = req.params.email;
    const doc = await Documents.findOne({ email: req.params.email });
    console.log(email);
    if (doc) {
        try {
            const updatedDoc = await Documents.findOneAndUpdate(
                { email: email },
                req.body,
                { new: true }
            );
            res.status(200).json(updatedDoc);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("Unauthorized!");
    }
}
);

// DELETE DOC
router.delete("/:id", async (req, res) => {
    const user = req.body.email;
    try {
        const doc = await Documents.findById(req.params.id);

        if (!doc) {
            return res.status(404).json({ message: "Document not found" });
        }
        if (user === doc.email) {
            const deletedDoc = await Documents.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: "Document Deleted Successfully", deletedDoc });
        } else {
            return res.status(401).json("Unauthorized!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
