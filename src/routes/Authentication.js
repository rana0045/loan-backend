import express from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { User } from "../models/user.model.js";
import { Documents } from "../models/documents.model.js";
import { Admin } from "../models/admin.model.js"
import Jwt from "jsonwebtoken";
const router = express.Router();

// UPDATE PASSWORD
router.post("/update-password", async (req, res) => {
    const { email, newPassword } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }


        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log(hashedPassword);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ msg: "Password updated successfully", user });
    } catch (err) {
        res.status(500).json(err);
    }
});

// REGISTER
router.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            state: req.body.state,
            zip_code: req.body.zip_code,
            city: req.body.city,
            phone: req.body.phone,
            dob: req.body.dob,
            ss_number: req.body.ss_number,
        });
        await newUser.save();

        const newDocs = new Documents({
            email: req.body.email,

        });
        await newDocs.save();

        return res.status(201).json({
            msg: "User saved successfully",
            newUser,
            Document: newDocs,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json("Wrong Credentials!");
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            return res.status(400).json("Wrong Credentials!");
        }

        const accessToken = Jwt.sign({ id: user._id, email: user.email, name: user.first_name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        const options = {
            httpOnly: false,
            secure: false, // Set to true for HTTPS, required when SameSite=None
            sameSite: "None", // Required for cookies to be sent in cross-origin requests
        };
        const { password, ...others } = user.toObject();

        return res.status(200).cookie("accessToken", accessToken, options).json({ msg: "Success Login", response: others, accessToken: accessToken })

    } catch (err) {
        res.status(500).json(err.message);
    }
});


//admin register 
router.post('/admin/register', async (req, res) => {
    try {

        const { email, password } = req.body;
        const isAdmin = await Admin.findOne({ email: email })

        if (isAdmin) {
            return res.status(200).json({ message: "email already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newAdmin = await Admin.create({ email: email, password: hashedPassword })
        if (!newAdmin) {
            return res.status(404).json({ message: "Error creating admin" })
        }
        res.status(200).json({ message: "Admin created successfully", newAdmin })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})


router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findOne({ email: email })

        if (!admin) {
            return res.status(404).json({ message: "admin not found" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, admin.password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" })
        }

        const accessToken = await Jwt.sign({
            id: admin._id,
            email: admin.email,
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        )
        const options = {
            httpOnly: false,
            secure: false, // Set to true for HTTPS, required when SameSite=None
            sameSite: "None", // Required for cookies to be sent in cross-origin requests
        };
        const loggedInUser = await Admin.findById(admin.id).select("-password -refreshToken");

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .json({ message: "Login successful", userDetails: loggedInUser, accessToken: accessToken })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

const sendEmail = ({ recipient_email, OTP }) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "tgifactoringrecovery@gmail.com",
                pass: "npdpvycduobfxkjw",
            },
        });

        const mail_configs = {
            from: "tgifactoringrecovery@gmail.com",
            to: recipient_email,
            subject: "TGIFACTORING PASSWORD RECOVERY",
            html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OTP Email Template</title>
</head>
<body>
<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
  <div style="margin: 50px auto; width: 70%; padding: 20px 0">
    <div style="border-bottom: 1px solid #eee">
      <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Tgifactoring</a>
    </div>
    <p style="font-size: 1.1em">Hi,</p>
    <p>Thank you for choosing Tgifactoring. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${OTP}</h2>
    <p style="font-size: 0.9em;">Regards,<br />Tgifactoring</p>
    <hr style="border: none; border-top: 1px solid #eee" />
    <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
      <p>Tgifactoring</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
</body>
</html>`,
        };
        transporter.sendMail(mail_configs, (error, info) => {
            if (error) {
                console.log(error);
                return reject({ message: "An error has occurred" });
            }
            return resolve({ message: "Email sent successfully" });
        });
    });
};

router.post("/send_recovery_email", async (req, res) => {
    const { recipient_email, OTP } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email: recipient_email });


        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        console.log(user);

        sendEmail(req.body)
            .then((response) => res.send(response.message))
            .catch((error) => res.status(500).send(error.message));
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
