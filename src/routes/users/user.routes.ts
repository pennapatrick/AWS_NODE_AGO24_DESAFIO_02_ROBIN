import { Router } from "express";
import { createUser } from "../../controllers/users/CreateUserController";
import { updateUser } from "../../controllers/users/UpdateUserController";
import { deleteUser } from "../../controllers/users/DeleteUserController";
import { listUsers } from "../../controllers/users/ListUserController";
import { listOneUser } from "../../controllers/users/ListOneUserController";

const router = Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', listUsers);
router.get('/:id', listOneUser);

export default router;
