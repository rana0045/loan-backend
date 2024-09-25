import express from "express";
import { User } from "../models/user.model.js";
import { Documents } from "../models/documents.model.js";
import { Provider } from "../models/provider.model.js";
import { Dispute } from "../models/dispute.model.js";

const router = express.Router();

// GET ALL USERS
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

const getMonthName = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[new Date(date).getMonth()];
};

router.get('/data', async (req, res) => {
    try {
        const users = await User.find();

        // Map users into an array of { month, users }
        const monthData = users.reduce((acc, user) => {

            const month = getMonthName(user.createdAt);

            // Find if the month already exists in the accumulator
            const monthEntry = acc.find(entry => entry.month === month);
            if (monthEntry) {
                monthEntry.users += 1; // Increment user count for this month
            } else {
                acc.push({ month: month, users: 1 }); // Add new month entry
            }
            return acc;
        }, []);

        res.status(200).json({ data: monthData });
    } catch (err) {
        res.status(500).json(err);
    }
});


// GET SPECIFIC USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {

        res.status(500).json(err);
    }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        Object.assign(user, req.body);
        const updatedUser = await user.save();
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const doc = await Documents.findOneAndDelete({ email: user.email });


        const provider = await Provider.findOneAndDelete({ email: user.email });


        const dispute = await Dispute.findOneAndDelete({ email: user.email });




        return res.status(200).json({ message: `User ${user.email} deleted!` });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
});



export default router;
