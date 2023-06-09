import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
import dotenv from "dotenv";
import { dbconnect } from "./src/config/dbConnect.js";

import authRouter from "./src/router/authRoute.js";
import { errorHandler, notFound } from "./src/middleware/errorHandler.js";
dotenv.config();

dbconnect();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// app.use("/", (req, res) => {
//   res.send("Hello");
// });

app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
