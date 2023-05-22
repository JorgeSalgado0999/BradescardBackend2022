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
exports.getQuestionsByCategorie = exports.getQuestions = exports.createQuestion = void 0;
const sequelize_1 = require("sequelize");
const securityFunctions_1 = require("../helpers/securityFunctions");
const Question_1 = __importDefault(require("../models/Question"));
const QuestionCategory_1 = __importDefault(require("../models/QuestionCategory"));
const utils_1 = require("../helpers/utils");
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entró aquí");
    try {
        const { data } = req.body;
        if (!data) {
            res.status(400).json({
                status: false,
                message: "No hay información para agregar",
            });
            return;
        }
        console.log("hay data");
        const question = {
            question: data.question,
            CategoryId: data.CategoryId,
        };
        console.log("question", question);
        //VALIDATE FIELDS
        //validate question
        if (!question.question) {
            res.status(400).json({
                status: false,
                message: "Especifique la pregunta",
            });
            return;
        }
        //validate categoryId
        const _category = yield QuestionCategory_1.default.findOne({
            where: { id: question.CategoryId },
        });
        console.log("category", _category);
        // Here we extract the obtain id and save it as PartnerId
        const { id: CategoryId } = _category === null || _category === void 0 ? void 0 : _category.get();
        console.log("Categoiria correcta");
        const newQuestion = yield Question_1.default.create({
            question: question.question,
            slug: (0, utils_1.createSlug)(question.question),
            CategoryId,
        });
        res.json(newQuestion);
    }
    catch (error) {
        (0, securityFunctions_1.handleError)(res, error);
    }
});
exports.createQuestion = createQuestion;
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, name } = req.query;
        const _page = page && typeof page == "string" ? parseInt(page) - 1 : 0;
        const _limit = limit && typeof limit == "string" ? parseInt(limit) : 10;
        var where;
        if (name) {
            where = { slug: { [sequelize_1.Op.like]: "%" + name + "%" } };
        }
        const categoriesFound = yield Question_1.default.findAll({
            where: where,
            offset: _limit * _page,
            limit: _limit,
        });
        const questions = categoriesFound.map((partner) => partner.get());
        const data = [];
        yield Promise.all(questions.map((question) => __awaiter(void 0, void 0, void 0, function* () {
            const currentCategory = yield QuestionCategory_1.default.findOne({
                where: { id: question.CategoryId },
                attributes: ["category"],
            });
            console.log("currentCategory", currentCategory);
            data.push({
                id: question.id,
                question: question.question,
                category: currentCategory.category,
            });
        })));
        res.json({
            status: true,
            data,
        });
    }
    catch (ex) {
        (0, securityFunctions_1.handleError)(res, ex);
    }
});
exports.getQuestions = getQuestions;
const getQuestionsByCategorie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = {};
        // first get all categories
        const categoriesFound = yield QuestionCategory_1.default.findAll({
            attributes: ["id", "category"],
            order: [["id", "ASC"]],
        });
        const categories = categoriesFound.map((categorie) => categorie.get());
        //This was necesary to avoid disorder
        categories.map((category) => {
            data[category.category] = {};
        });
        // now we look for all questions for each category
        yield Promise.all(categories.map((category) => __awaiter(void 0, void 0, void 0, function* () {
            const questionsFound = yield Question_1.default.findAll({
                where: { CategoryId: category.id },
                order: [["id", "ASC"]],
            });
            const tempData = questionsFound.map((question) => question.get());
            data[category.category] = {
                id: category.id,
                questions: tempData,
            };
        })));
        res.json({
            status: true,
            data,
        });
    }
    catch (ex) {
        (0, securityFunctions_1.handleError)(res, ex);
    }
});
exports.getQuestionsByCategorie = getQuestionsByCategorie;
//# sourceMappingURL=question.controller.js.map