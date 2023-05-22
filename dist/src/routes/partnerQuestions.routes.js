"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partnerQuestions_controller_1 = require("../controllers/partnerQuestions.controller");
const partnerQuestionRouter = (0, express_1.Router)();
partnerQuestionRouter.post("/", partnerQuestions_controller_1.addQuestionPartner);
exports.default = partnerQuestionRouter;
//# sourceMappingURL=partnerQuestions.routes.js.map