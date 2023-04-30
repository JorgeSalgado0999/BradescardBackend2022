"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const UserRouter = (0, express_1.Router)();
UserRouter.get("/", user_controller_1.getUsers);
UserRouter.get("/:userId", user_controller_1.validateUser);
UserRouter.post("/", user_controller_1.createUser);
// UserRouter.get("/", authMiddleware, getUsers);
// UserRouter.get("/:userId", authMiddleware, validateUser);
// UserRouter.post("/", authMiddleware, createUser);
exports.default = UserRouter;
//# sourceMappingURL=users.routes.js.map