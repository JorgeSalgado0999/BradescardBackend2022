import {Router} from "express";

import {
	getUsers,
	createUser,
	validateUser,
} from "../controllers/user.controller";
import {authMiddleware} from "../helpers/securityFunctions";

const UserRouter = Router();

UserRouter.get("/", getUsers);
UserRouter.get("/:userId", validateUser);
UserRouter.post("/", createUser);

// UserRouter.get("/", authMiddleware, getUsers);
// UserRouter.get("/:userId", authMiddleware, validateUser);
// UserRouter.post("/", authMiddleware, createUser);

export default UserRouter;
