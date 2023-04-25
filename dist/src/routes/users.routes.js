"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const securityFunctions_1 = require("../helpers/securityFunctions");
const UserRouter = (0, express_1.Router)();
UserRouter.get("/", securityFunctions_1.authMiddleware, user_controller_1.getUsers);
UserRouter.post("/", securityFunctions_1.authMiddleware, user_controller_1.createUser);
exports.default = UserRouter;
//# sourceMappingURL=users.routes.js.map