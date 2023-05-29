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
exports.getReviewQuestions = exports.getReviews = exports.createReview = void 0;
const sequelize_1 = require("sequelize");
const securityFunctions_1 = require("../helpers/securityFunctions");
const ReviewAnswer_1 = __importDefault(require("../models/ReviewAnswer"));
const Review_1 = __importDefault(require("../models/Review"));
const Partner_1 = __importDefault(require("../models/Partner"));
const Store_1 = __importDefault(require("../models/Store"));
const PartnerQuestions_1 = __importDefault(require("../models/PartnerQuestions"));
const Question_1 = __importDefault(require("../models/Question"));
const QuestionCategory_1 = __importDefault(require("../models/QuestionCategory"));
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        let newReviewId = 0;
        let newQuestions = [0];
        if (!data) {
            res.status(400).json({
                status: false,
                message: "No hay información para agregar",
            });
            return;
        }
        //Todo: Validate data
        const review = {
            date: data.date,
            startTime: data.startTime,
            endTime: data.endTime,
            online: data.online,
            type: data.type,
            rating: data.rating,
            contactName: data.contactName,
            PartnerId: data.PartnerId,
            StoreId: data.StoreId,
            questions: data.questions,
        };
        // Validate Partner
        const _partner = yield Partner_1.default.findOne({ where: { id: review.PartnerId } });
        // Here we extract the obtain id and save it as PartnerId
        const { id: PartnerId } = _partner === null || _partner === void 0 ? void 0 : _partner.get();
        // Validate Store
        const _store = yield Store_1.default.findOne({ where: { id: review.StoreId } });
        // Here we extract the obtain id and save it as PartnerId
        const { id: StoreId } = _store === null || _store === void 0 ? void 0 : _store.get();
        const newReview = yield Review_1.default.create(Object.assign(Object.assign({}, review), { PartnerId,
            StoreId }));
        // Validate Answers
        console.log("data.questions", data.questions, "\n\n");
        yield Promise.all(data.questions.map((answer) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("answer", answer, "\n\n");
            try {
                const newAnswer = yield ReviewAnswer_1.default.create({
                    status: answer.answer.status,
                    comments: answer.answer.comments,
                    plan: answer.answer.plan,
                    date: answer.answer.date,
                    breach: answer.answer.breach,
                    QuestionId: answer.question.id,
                    ReviewId: newReview.id,
                });
                newQuestions.push(newAnswer.id);
            }
            catch (error) {
                console.log(error);
                console.log("Se debería de eliminar el review y todas las preguntas", "\n\n\n\n\n\n\n\n");
            }
        })));
        //Rersponse
        res.json(newReview);
    }
    catch (error) {
        (0, securityFunctions_1.handleError)(res, error);
    }
});
exports.createReview = createReview;
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, name } = req.query;
        const _page = page && typeof page == "string" ? parseInt(page) - 1 : 0;
        const _limit = limit && typeof limit == "string" ? parseInt(limit) : 10;
        var where;
        if (name) {
            where = { slug: { [sequelize_1.Op.like]: "%" + name + "%" } };
        }
        const reviewsFound = yield Review_1.default.findAll({
            where: where,
            offset: _limit * _page,
            limit: _limit,
        });
        const data = reviewsFound.map((review) => review.get());
        res.json({
            status: true,
            data,
        });
    }
    catch (ex) {
        (0, securityFunctions_1.handleError)(res, ex);
    }
});
exports.getReviews = getReviews;
const getReviewQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partnerId = req.query.partnerId;
        const online = req.query.online;
        let newOnline;
        let whereSentence;
        if (online == "true") {
            newOnline = 1;
            whereSentence = { PartnerId: partnerId, online: newOnline };
        }
        else {
            newOnline = 0;
            whereSentence = { PartnerId: partnerId };
        }
        // console.log(
        // 	"partnerId",
        // 	partnerId,
        // 	"online",
        // 	online,
        // 	"newOnline",
        // 	newOnline,
        // 	"\n\n\n\n\n\n\n\n"
        // );
        const categories = yield PartnerQuestions_1.default.findAll({
            where: whereSentence,
            attributes: ["CategoryId"],
        });
        //convert to array
        let categoriesArray = [];
        categories.map((category) => {
            categoriesArray.push(category.CategoryId);
        });
        //remove duplicates
        categoriesArray = [...new Set(categoriesArray)];
        // get categories
        const categoriesFound = yield QuestionCategory_1.default.findAll({
            where: { id: categoriesArray },
            attributes: ["id", "category", "slug"],
        });
        //create data structure
        let data = [];
        // categoriesFound.forEach((category: any) => {
        // 	data.push({
        // 		category: category.category,
        // 		questions: [],
        // 	});
        // });
        //get questions
        let dataWhereSentence = whereSentence;
        yield Promise.all(categoriesFound.map((category) => __awaiter(void 0, void 0, void 0, function* () {
            dataWhereSentence.CategoryId = category.id;
            let questions = yield PartnerQuestions_1.default.findAll({
                where: dataWhereSentence,
                include: [
                    {
                        model: Question_1.default,
                        include: [
                            {
                                model: QuestionCategory_1.default,
                            },
                        ],
                    },
                ],
            });
            data.push({
                category: category.category,
                categoryId: category.id,
                questions: questions,
            });
        })));
        // const questions = await PartnerQuestions.findAll({
        // 	where: whereSentence,
        // 	include: [
        // 		{
        // 			model: Question,
        // 			include: [
        // 				{
        // 					model: QuestionCategory,
        // 				},
        // 			],
        // 		},
        // 	],
        // });
        // console.log(categoriesArray, "\n\n\n\n\n\n\n\n");
        res.json({
            status: true,
            data: data,
        });
    }
    catch (error) {
        (0, securityFunctions_1.handleError)(res, error);
    }
});
exports.getReviewQuestions = getReviewQuestions;
//# sourceMappingURL=review.controller.js.map