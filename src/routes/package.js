import Package from "../models/package.model.js";
import { Router } from "express";

const route = new Router()

route.post('/add', async (req, res) => {
    try {
        const { name, price, duration, monthlyPayment, features } = req.body

        if (!name || !price || !duration) {
            return res.status(404).json({ message: "All input fields req" });
        }

        const newPackage = await Package.create({
            name: name,
            price: price,
            duration: duration,
            monthlyPayment: monthlyPayment,
            features: features

        })

        return res.status(200).json({ data: newPackage })


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})


route.get('/get', async (req, res) => {
    try {
        const allPackages = await Package.find()
        if (allPackages.length === 0) {
            return res.status(404).json({ message: 'No packages found' })
        }

        return res.status(200).json({
            data: allPackages, message: 'Packages found'
        })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

route.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ error: "Invalid id" })
        }


        const data = await Package.findById(id)

        if (!data) {
            return res.status(404).json({ error: "Package not found" })
        }
        return res.status(200).json({
            data: data, message: "success"
        })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})



export default route