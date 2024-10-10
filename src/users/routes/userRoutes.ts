import express from "express";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/createUserController";

const router = express.Router();

router.post("/api/users/createuser", createUser);
router.put("/api/users/updateuser/:id", updateUser);
router.delete("/api/users/deleteuser/:id", deleteUser);

export default router;
