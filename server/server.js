import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/mongoose.config.js";
import palRoutes from "./routes/pal.routes.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

dbConnect();

app.use(express.json(), cors({ origin: "http://localhost:5173" }));

app.use("/api", palRoutes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
