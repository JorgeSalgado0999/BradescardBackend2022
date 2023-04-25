import {Op} from "sequelize";
import {Request, Response} from "express";
import {handleError} from "../helpers/securityFunctions";

import ReviewAnswer from "../models/ReviewAnswer";
import AnswerInterface from "../interfaces/Answer";

export const createAnswer = async (req: Request, res: Response) => {
	try {
		const {data} = req.body;

		if (!data) {
			res.status(400).json({
				status: false,
				message: "No hay información para agregar",
			});
			return;
		}

		const answer: AnswerInterface = {
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

		const newCategory = await ReviewAnswer.create({
			...answer,
		});
		console.log(newCategory);
		res.json(newCategory);
	} catch (error) {
		handleError(res, error);
	}
};

export const getAnswers = async (req: Request, res: Response) => {
	try {
		const {page, limit, name} = req.query;

		const _page = page && typeof page == "string" ? parseInt(page) - 1 : 0;
		const _limit = limit && typeof limit == "string" ? parseInt(limit) : 10;

		var where;

		if (name) {
			where = {slug: {[Op.like]: "%" + name + "%"}};
		}

		const categoriesFound = await ReviewAnswer.findAll({
			where: where,
			offset: _limit * _page,
			limit: _limit,
		});
		const data = categoriesFound.map((partner: any) => partner.get());

		res.json({
			status: true,
			data,
		});
	} catch (ex) {
		handleError(res, ex);
	}
};
