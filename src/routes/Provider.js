import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { Documents } from "../models/documents.model.js";
import { Provider } from "../models/provider.model.js";

const router = express.Router();

// GET Provider
router.get("/:email", async (req, res) => {
    try {
        const provider = await Provider.find({ email: req.params.email });
        console.log(provider);
        res.status(200).json(provider);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  
router.post("/", async (req, res) => {
    try {
        const newProvider = new Provider({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            phone_no: req.body.phone_no,
            security_word: req.body.security_word,
            report_provider: req.body.report_provider,
        });
        const savedProvider = await newProvider.save();
        res.status(201).json(savedProvider);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE Provider
router.put("/:email", async (req, res) => {
    try {
        const provider = await Provider.findOne({ email: req.params.email });

        if (!provider) {
            return res.status(404).json({ msg: "Provider not found" });
        }
        Object.assign(provider, req.body);
        const updatedProvider = await provider.save();
        res.json({ message: "Provider details updated successfully", updatedProvider });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE Provider details
router.delete("/:id", async (req, res) => {
    try {
        const provider = await Provider.findByIdAndDelete(req.params.id);
        if (!provider) {
            return res.status(404).json({ msg: "Provider not found" });
        }

        return res.status(200).json({ message: `Provider deleted!`, provider });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong", error: err.message });
    }
});

// // GET ALL Providers
// router.get("/", async (req, res) => {
//   try {
//     const providers = await Provider.find();
//     res.status(200).json(providers);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

export default router;
