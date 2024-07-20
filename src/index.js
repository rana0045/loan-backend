import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./DB/connect.js";
dotenv.config({
    path: "./env"
})
const port = process.env.PORT

connectDB().then(() => {
    app.listen(port, () => {
        console.log("server is listing on PORT", port);
    })
})