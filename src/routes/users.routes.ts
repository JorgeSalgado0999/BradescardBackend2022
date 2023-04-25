import {Router} from "express";

import {getUsers, createUser} from "../controllers/user.controller";
import {authMiddleware} from "../helpers/securityFunctions";

const UserRouter = Router();

UserRouter.get("/", authMiddleware, getUsers);

UserRouter.post("/", authMiddleware, createUser);

export default UserRouter;
