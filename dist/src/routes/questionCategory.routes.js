"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questionCategory_controller_1 = require("../controllers/questionCategory.controller");
const QuestionCategoryRouter = (0, express_1.Router)();
QuestionCategoryRouter.post("/", questionCategory_controller_1.createCategory);
QuestionCategoryRouter.get("/", questionCategory_controller_1.getCategories);
exports.default = QuestionCategoryRouter;
//# sourceMappingURL=questionCategory.routes.js.map