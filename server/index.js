import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./routes/user.routes.js";
import Entry from "./routes/entry.routes.js";
dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("Mongodb Connected Successfully"));

app.use("/api/auth", User);

app.use("/api/diary", Entry);

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
