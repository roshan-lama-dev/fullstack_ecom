import express from "express";
import {
  createUser,
  deleteSingleUser,
  getAllUser,
  getSingleUser,
  loginUser,
  updateUser,
} from "../controller/userCtrl.js";

import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

// create User
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/allusers", getAllUser);
router.get("/:id", authMiddleware, isAdmin, getSingleUser);
router.delete("/:id", deleteSingleUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, updateUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, updateUser);

export default router;
