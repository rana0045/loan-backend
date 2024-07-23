import mongoose from "mongoose";
const disputeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    equifax_report: {
        type: String,
        required: true,
    },
    experian_report: {
        type: String,
        required: true,
    },
    transUnion_report: {
        type: String,
        required: true,
    },
    account_number: {
        type: String,
        default: null,
    },
    equifax_account: {
        type: String,
        default: null,
    },
    experian_account: {
        type: String,
        default: null,
    },
    transUnion_account: {
        type: String,
        default: null,
    },
    equifax: {
        type: Boolean,
        default: false,
    },
    trans_union: {
        type: Boolean,
        default: false,
    },
    experian: {
        type: Boolean,
        default: false,
    },
    reason: {
        type: String,
        required: true,
    },
    credit_furnisher: {
        type: String,
        default: null,
    },
    instruction: {
        type: String,
        default: null,
    },
    experian_letter: {
        type: String,
        default: null,
    },
    trans_union_letter: {
        type: String,
        default: null,
    },
    equifax_letter: {
        type: String,
        default: null,
    },
    letter_name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Dispute = mongoose.model("Dispute", disputeSchema);


