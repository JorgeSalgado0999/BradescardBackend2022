"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_controller_1 = require("../controllers/question.controller");
const QuestionRouter = (0, express_1.Router)();
QuestionRouter.post("/", question_controller_1.createQuestion);
QuestionRouter.get("/", question_controller_1.getQuestions);
QuestionRouter.get("/by-category", question_controller_1.getQuestionsByCategorie);
exports.default = QuestionRouter;
//# sourceMappingURL=question.routes.js.map