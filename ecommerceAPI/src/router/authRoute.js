import express from "express";
import {
  blockUser,
  createUser,
  deleteSingleUser,
  getAllUser,
  getSingleUser,
  handleRefreshToken,
  loginUser,
  unblockUser,
  updateUser,
} from "../controller/userCtrl.js";

import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

// create User
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/allusers", getAllUser);
router.get("/refresh", handleRefreshToken);

router.get("/:id", authMiddleware, isAdmin, getSingleUser);
router.delete("/:id", deleteSingleUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

export default router;
