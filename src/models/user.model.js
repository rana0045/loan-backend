import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip_code: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,

    },
    ss_number: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    payment_status: {
        type: String,
        default: "unpaid"
    },
    packages: {
        type: String,

    }
}, { timestamps: true });


// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next()

//     this.password = await bcrypt.hash(this.password, 10)
//     next()
// })

// userSchema.methods.isPasswordCorrect = async function (password) {
//     return await bcrypt.compare(password, this.password)
// }



// userSchema.methods.generateAccessToken = async function (accessToken) {
//     return await jwt.sign({
//         _id: this._id,
//         email: this.email,
//         phone: this.phone,
//         firstname: this.firstname,
//         lastname: this.lastname,
//     },
//         process.env.ACCESS_TOKEN_SECRET,

//         {
//             expiresIn: "1d"
//         }
//     )
// }


// userSchema.methods.generateRefreshToken = async function () {
//     return Jwt.sign({
//         _id: this._id,
//     },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: "10d"
//         }
//     );
// };


export const User = mongoose.model("User", userSchema);


