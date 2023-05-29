import {Op} from "sequelize";
import {Request, Response} from "express";
import {handleError} from "../helpers/securityFunctions";

import ReviewAnswer from "../models/ReviewAnswer";
import AnswerInterface from "../interfaces/Answer";
import ReviewInterface from "../interfaces/Review";
import Review from "../models/Review";
import Partner from "../models/Partner";
import Store from "../models/Store";
import PartnerQuestions from "../models/PartnerQuestions";
import Question from "../models/Question";
import QuestionCategory from "../models/QuestionCategory";

export const createReview = async (req: Request, res: Response) => {
	try {
		const {data} = req.body;
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

		const review: ReviewInterface = {
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
		const _partner = await Partner.findOne({where: {id: review.PartnerId}});
		// Here we extract the obtain id and save it as PartnerId
		const {id: PartnerId} = _partner?.get();
		// Validate Store
		const _store = await Store.findOne({where: {id: review.StoreId}});
		// Here we extract the obtain id and save it as PartnerId
		const {id: StoreId} = _store?.get();

		const newReview: any = await Review.create({
			...review,
			PartnerId,
			StoreId,
		});

		// Validate Answers
		console.log("data.questions", data.questions, "\n\n");
		await Promise.all(
			data.questions.map(async (answer: any) => {
				console.log("answer", answer, "\n\n");
				try {
					const newAnswer: any = await ReviewAnswer.create({
						status: answer.answer.status,
						comments: answer.answer.comments,
						plan: answer.answer.plan,
						date: answer.answer.date,
						breach: answer.answer.breach,
						QuestionId: answer.question.id,
						ReviewId: newReview.id,
					});
					newQuestions.push(newAnswer.id);
				} catch (error) {
					console.log(error);
					console.log(
						"Se debería de eliminar el review y todas las preguntas",
						"\n\n\n\n\n\n\n\n"
					);
				}
			})
		);

		//Rersponse
		res.json(newReview);
	} catch (error) {
		handleError(res, error);
	}
};

export const getReviews = async (req: Request, res: Response) => {
	try {
		const {page, limit, name} = req.query;

		const _page = page && typeof page == "string" ? parseInt(page) - 1 : 0;
		const _limit = limit && typeof limit == "string" ? parseInt(limit) : 10;

		var where;

		if (name) {
			where = {slug: {[Op.like]: "%" + name + "%"}};
		}

		const reviewsFound = await Review.findAll({
			where: where,
			offset: _limit * _page,
			limit: _limit,
		});
		const data = reviewsFound.map((review: any) => review.get());

		res.json({
			status: true,
			data,
		});
	} catch (ex) {
		handleError(res, ex);
	}
};

export const getReviewQuestions = async (req: Request, res: Response) => {
	try {
		const partnerId = req.query.partnerId;
		const online = req.query.online;
		let newOnline: number;
		let whereSentence: any;

		if (online == "true") {
			newOnline = 1;
			whereSentence = {PartnerId: partnerId, online: newOnline};
		} else {
			newOnline = 0;
			whereSentence = {PartnerId: partnerId};
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

		const categories = await PartnerQuestions.findAll({
			where: whereSentence,
			attributes: ["CategoryId"],
		});

		//convert to array
		let categoriesArray: any = [];
		categories.map((category: any) => {
			categoriesArray.push(category.CategoryId);
		});

		//remove duplicates
		categoriesArray = [...new Set(categoriesArray)];

		// get categories
		const categoriesFound = await QuestionCategory.findAll({
			where: {id: categoriesArray},
			attributes: ["id", "category", "slug"],
		});

		//create data structure
		let data: any = [];
		// categoriesFound.forEach((category: any) => {
		// 	data.push({
		// 		category: category.category,
		// 		questions: [],
		// 	});
		// });

		//get questions
		let dataWhereSentence: any = whereSentence;

		await Promise.all(
			categoriesFound.map(async (category: any) => {
				dataWhereSentence.CategoryId = category.id;
				let questions = await PartnerQuestions.findAll({
					where: dataWhereSentence,
					include: [
						{
							model: Question,
							include: [
								{
									model: QuestionCategory,
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
			})
		);

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
	} catch (error) {
		handleError(res, error);
	}
};
