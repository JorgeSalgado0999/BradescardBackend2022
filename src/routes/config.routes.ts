import {Router} from "express";
import {
	syncDB,
	createUserRoles,
	createStates,
} from "../controllers/config.controller";
import {authMiddleware} from "../helpers/securityFunctions";

const configRouter = Router();

configRouter.get("/sync-db", syncDB);
configRouter.get("/createUserRoles", createUserRoles);
configRouter.get("/createStates", createStates);

export default configRouter;
