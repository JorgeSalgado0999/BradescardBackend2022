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
exports.getAnswers = exports.createAnswer = void 0;
const sequelize_1 = require("sequelize");
const securityFunctions_1 = require("../helpers/securityFunctions");
const ReviewAnswer_1 = __importDefault(require("../models/ReviewAnswer"));
const createAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        if (!data) {
            res.status(400).json({
                status: false,
                message: "No hay información para agregar",
            });
            return;
        }
        const answer = {
            questionId: data.questionId,
            status: data.status,
            comments: data.comments,
            plan: data.plan,
            date: data.date,
            breach: data.breach,
        };
        //VALIDATE FIELDS
        if (!answer.questionId) {
            res.status(400).json({
                status: false,
                message: "Especifique el id de la pregunta",
            });
            return;
        }
        const newCategory = yield ReviewAnswer_1.default.create(Object.assign({}, answer));
        console.log(newCategory);
        res.json(newCategory);
    }
    catch (error) {
        (0, securityFunctions_1.handleError)(res, error);
    }
});
exports.createAnswer = createAnswer;
const getAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, name } = req.query;
        const _page = page && typeof page == "string" ? parseInt(page) - 1 : 0;
        const _limit = limit && typeof limit == "string" ? parseInt(limit) : 10;
        var where;
        if (name) {
            where = { slug: { [sequelize_1.Op.like]: "%" + name + "%" } };
        }
        const categoriesFound = yield ReviewAnswer_1.default.findAll({
            where: where,
            offset: _limit * _page,
            limit: _limit,
        });
        const data = categoriesFound.map((partner) => partner.get());
        res.json({
            status: true,
            data,
        });
    }
    catch (ex) {
        (0, securityFunctions_1.handleError)(res, ex);
    }
});
exports.getAnswers = getAnswers;
//# sourceMappingURL=reviewAnswer.controller.js.map