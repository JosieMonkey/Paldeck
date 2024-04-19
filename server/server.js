import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/monogoose.config.js";
import bookRoutes from "./routes/book.routes.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

dbConnect();

app.use(express.json(), cors({ origin: "http://localhost:5173" }));

app.use("/api", bookRoutes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
