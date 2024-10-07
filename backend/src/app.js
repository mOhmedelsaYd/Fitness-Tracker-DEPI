import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./config/database.js";
import userRoute from "./routes/authRoute.js";
import cors from "cors";

const app = express();
dotenv.config();

// database connection
dbConnection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", userRoute);

export default app;
