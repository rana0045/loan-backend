import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
    origin: '*'
    
}))


app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser())
app.use(express.static('./uploads'))
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

import authRoute from "./routes/Authentication.js"
import provRoute from "./routes/Provider.js"
import userRoute from "./routes/User.js"
import docsRoute from "./routes/Documents.js"
import dispRoute from "./routes/Dispute.js"
import todoRoute from "./routes/Todo.js"
import packageRoute from "./routes/package.js"

app.use("/auth", authRoute)
app.use("/provider", provRoute);
app.use("/user", userRoute);
app.use("/doc", docsRoute);
app.use("/dispute", dispRoute);
app.use("/todo", todoRoute);
app.use("/package", packageRoute);
export default app