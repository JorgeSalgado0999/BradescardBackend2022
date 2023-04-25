"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const AuthRouter = (0, express_1.Router)();
AuthRouter.post("/", auth_controller_1.login);
exports.default = AuthRouter;
//# sourceMappingURL=auth.routes.js.map