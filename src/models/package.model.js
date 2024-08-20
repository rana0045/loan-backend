import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

    monthlyPayment: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number, // Duration in days
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },

});

const Package = mongoose.model('Package', packageSchema);

export default Package;
