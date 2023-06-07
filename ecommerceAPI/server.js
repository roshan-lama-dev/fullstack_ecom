import express from "express";
const app = express();
import dotenv from "dotenv";
import { dbconnect } from "./src/config/dbConnect.js";

import { authRouter } from "./src/router/authRoute.js";
dotenv.config();

dbconnect();
const PORT = process.env.PORT || 4000;

app.use("/", (req, res) => {
  res.send("Hello");
});

ap.use("/api/user", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
