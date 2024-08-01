import { Router } from "express";
import { Todo } from "../models/todo.model.js";


const router = new Router();


router.post('/:id', async (req, res) => {
    try {
        const id = req.params.id; // get the id from the request params
        const { title } = req.body

        if (!id || !title) {
            return res.status(400).json({ error: 'id and title are required' })
        }
        const newTask = await Todo.create({ user: id, title: title })
        return res.status(200).json({ message: " task is created", Data: newTask, success: true })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(404).json({ message: " id not found" })
        }
        const Tasks = await Todo.find({ user: id });
        return res.status(200).json({ message: "user tasks", data: Tasks, success: true })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})



router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(404).json({ message: " id not found" })
        }
        const Tasks = await Todo.findByIdAndDelete(id)

        if (!Tasks) {
            return res.status(404).json({ message: " Tasks not found" })
        }
        return res.status(200).json({ message: "user task deleted", data: Tasks, success: true })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { status } = req.body
        if (!id) {
            return res.status(404).json({ message: " id not found" })
        }
        const updatedTask = await Todo.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );
        if (!Tasks) {
            return res.status(404).json({ message: " Tasks not found" })
        }
        return res.status(200).json({ message: "user task deleted", data: Tasks, success: true })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


export default router