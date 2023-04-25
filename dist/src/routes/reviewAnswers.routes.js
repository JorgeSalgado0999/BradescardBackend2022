"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewAnswer_controller_1 = require("../controllers/reviewAnswer.controller");
const ReviewAnswersRouter = (0, express_1.Router)();
ReviewAnswersRouter.post("/", reviewAnswer_controller_1.createAnswer);
ReviewAnswersRouter.get("/", reviewAnswer_controller_1.getAnswers);
exports.default = ReviewAnswersRouter;
//# sourceMappingURL=reviewAnswers.routes.js.map