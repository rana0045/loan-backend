import mongoose from "mongoose";

const documentsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    photo_ID: {
        type: String,
        default: 'photo',
    },
    proof_of_address: {
        type: String,
        default: 'photo',
    },
    user_agreement_freeze: {
        type: Boolean,
        default: false,
    },
    consumer_office_freeze: {
        type: Boolean,
        default: false,
    },
    lexis_nexis_freeze: {
        type: Boolean,
        default: false,
    },
    positive_account: {
        type: Boolean,
        default: false,
    },
    boomplay: {
        type: Boolean,
        default: false,
    },
    kikoff: {
        type: Boolean,
        default: false,
    },
    self: {
        type: Boolean,
        default: false,
    },
    creditstrong: {
        type: Boolean,
        default: false,
    },
    experian: {
        type: Boolean,
        default: false,
    },
    credit: {
        type: Boolean,
        default: false,
    },
    innovice: {
        type: Boolean,
        default: false,
    },
    clarityservices: {
        type: Boolean,
        default: false,
    },
    chexsystems: {
        type: Boolean,
        default: false,
    },
    sagestreamilc: {
        type: Boolean,
        default: false,
    },
    smartcredit: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


export const Documents = mongoose.model('Documents', documentsSchema);