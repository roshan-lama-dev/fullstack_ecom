import express from "express";
import { createUser } from "../controller/userCtrl.js";
const router = express.Router();

// create User
router.post("/register", createUser);

export default router;
