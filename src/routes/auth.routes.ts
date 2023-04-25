import {Router} from "express";

import {login} from "../controllers/auth.controller";
import {authMiddleware} from "../helpers/securityFunctions";

const AuthRouter = Router();

AuthRouter.post("/", login);

export default AuthRouter;
