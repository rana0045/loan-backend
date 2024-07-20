import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_no: {
        type: String,
        required: true,
    },
    security_word: {
        type: String,
        required: true,
    },
    report_provider: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

export const Provider = mongoose.model("Provider", providerSchema);


