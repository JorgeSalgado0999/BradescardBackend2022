import {Op} from "sequelize";
import {Request, Response} from "express";
import {handleError} from "../helpers/securityFunctions";

import ReviewAnswer from "../models/ReviewAnswer";
import AnswerInterface from "../interfaces/Answer";
import ReviewInterface from "../interfaces/Review";
import Review from "../models/Review";
import Partner from "../models/Partner";
import Store from "../models/Store";

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
			online: data.online,
			type: data.type,
			rating: data.rating,

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
		await Promise.all(
			data.questions.map(async (answer: AnswerInterface) => {
				try {
					const newAnswer: any = await ReviewAnswer.create({
						...answer,
						ReviewId: newReview.id,
					});
					newQuestions.push(newAnswer.id);
				} catch (error) {
					console.log(error);
					console.log("Se debería de eliminar el review y todas las preguntas");
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
