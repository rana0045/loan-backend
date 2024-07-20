import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin"
    }
}, {
    timeseries: true
})


export const Admin = mongoose.model('Admin', adminSchema)

