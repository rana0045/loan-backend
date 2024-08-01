import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["completed", "open"],
        default: "open"
    }
},
    { timestamps: true }
)


export const Todo = mongoose.model('todo', TodoSchema)