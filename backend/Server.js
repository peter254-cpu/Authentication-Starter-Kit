import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

//middleware
dotenv.config();
app.use(express.json()); //allow to parse incoming requets: body.req
app.use(logger("combined"));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true}))

//Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at ${PORT}`);
});
