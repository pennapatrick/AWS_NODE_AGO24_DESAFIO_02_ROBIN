import { Router } from "express";
import { authorize } from "../../middleware/auth.middleware";
import { createUser } from "../../controllers/users/CreateUserController";
import { updateUser } from "../../controllers/users/UpdateUserController";
import { deleteUser } from "../../controllers/users/DeleteUserController";
import { listUsers } from "../../controllers/users/ListUserController";
import { listOneUser } from "../../controllers/users/ListOneUserController";
import { celebrate } from "celebrate";
import {
  userCreateValidationSchema,
  userUpdateValidationSchema,
} from "../../validations/users/UserValidations";

const router = Router();

router.post("/", userCreateValidationSchema, authorize, createUser);
router.put("/:id", userUpdateValidationSchema, authorize, updateUser);
router.delete("/:id", authorize, deleteUser);
router.get("/", authorize, listUsers);
router.get("/:id", authorize, listOneUser);

export default router;
