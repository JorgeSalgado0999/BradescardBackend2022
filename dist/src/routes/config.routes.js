"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_controller_1 = require("../controllers/config.controller");
const configRouter = (0, express_1.Router)();
configRouter.get("/sync-db", config_controller_1.syncDB);
configRouter.get("/createUserRoles", config_controller_1.createUserRoles);
// configRouter.get("/createStates", createStates);
configRouter.get("/createPartners", config_controller_1.createPartners);
configRouter.get("/createCategories", config_controller_1.createCategories);
exports.default = configRouter;
//# sourceMappingURL=config.routes.js.map