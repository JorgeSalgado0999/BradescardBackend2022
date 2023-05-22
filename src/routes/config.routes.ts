import {Router} from "express";
import {
	syncDB,
	createUserRoles,
	createPartners,
	createCategories,
} from "../controllers/config.controller";
import {authMiddleware} from "../helpers/securityFunctions";

const configRouter = Router();

configRouter.get("/sync-db", syncDB);
configRouter.get("/createUserRoles", createUserRoles);
// configRouter.get("/createStates", createStates);
configRouter.get("/createPartners", createPartners);
configRouter.get("/createCategories", createCategories);

export default configRouter;
