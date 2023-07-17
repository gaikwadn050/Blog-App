import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import authRouter from "./routes/auth.js"
import postRouter from "./routes/postRoutes.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {verifyToken} from "./utils/jwtUtils.js"
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()


const PORT = process.env.PORT || 5555

app.use(cors({
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true,
}
))
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

//mongodb connection
mongoose.connect(
  process.env.MONGO_URI,
  (err) => {
    if (err) console.log(err)
    else console.log("mongdb is connected");
  }
).then(() => console.log('connected'))
  .catch(e => console.log(e, 'mongo error ok'));





//Routes

app.use("/api/auth", authRouter)
app.use("/api", postRouter)
//server
app.listen(PORT, console.log(`server started on port :${PORT}`))
