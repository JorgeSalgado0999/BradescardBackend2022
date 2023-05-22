"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQuestionPartner = void 0;
const securityFunctions_1 = require("../helpers/securityFunctions");
const PartnerQuestions_1 = __importDefault(require("../models/PartnerQuestions"));
const addQuestionPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        if (!data) {
            res.status(400).json({
                status: false,
                message: "No hay información para agregar",
            });
            return;
        }
        //VALIDATE FIELDS
        if (!data.partner) {
            res.status(400).json({
                status: false,
                message: "Especifique un socio",
            });
            return;
        }
        if (!data.questions) {
            res.status(400).json({
                status: false,
                message: "Especifique las preguntas a agregar",
            });
            return;
        }
        const { partner, questions } = data;
        questions.map((question) => __awaiter(void 0, void 0, void 0, function* () {
            PartnerQuestions_1.default.create({
                QuestionId: question.questionId,
                online: question.online,
                PartnerId: partner.id,
            });
        }));
        res.json(true);
    }
    catch (error) {
        (0, securityFunctions_1.handleError)(res, error);
    }
});
exports.addQuestionPartner = addQuestionPartner;
//# sourceMappingURL=partnerQuestions.controller.js.map