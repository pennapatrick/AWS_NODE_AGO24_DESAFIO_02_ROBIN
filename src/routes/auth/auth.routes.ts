import { Router } from "express";
import { login } from "../../controllers/users/LoginUserController";

const router = Router();

router.post("/", login);

export default router;
