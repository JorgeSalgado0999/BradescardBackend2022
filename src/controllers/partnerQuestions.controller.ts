import {Op} from "sequelize";
import {Request, Response} from "express";
import {handleError} from "../helpers/securityFunctions";

import QuestionInterface from "../interfaces/Question";
import Question from "../models/Question";
import QuestionCategory from "../models/QuestionCategory";
import PartnerQuestions from "../models/PartnerQuestions";
import Partner from "../models/Partner";

export const addQuestionPartner = async (req: Request, res: Response) => {
	try {
		const {data} = req.body;

		if (!data) {
			res.status(400).json({
				status: false,
				message: "No hay información para agregar",
			});
			return;
		}

		//VALIDATE FIELDS
		if (!data.partnerId) {
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

		const {partnerId, questions} = data;

		questions.map(async (question: any) => {
			const questionExist: any = await Question.findOne({
				where: {
					id: question.questionId,
				},
			});

			// if (!questionExist) {
			// 	res.status(400).json({
			// 		status: false,
			// 		message: `La pregunta con id ${question.questionId} no existe`,
			// 	});
			// }

			PartnerQuestions.create({
				QuestionId: questionExist!.id,
				online: question.online,
				PartnerId: partnerId,
				CategoryId: questionExist!.CategoryId,
			});
		});

		res.json(true);
	} catch (error) {
		handleError(res, error);
	}
};

export const getQuestionsPartner = async (req: Request, res: Response) => {
	try {
		const {partnerId} = req.params;
		console.log(partnerId, "\n\n\n\n\n\n\n\n");

		const questions = await PartnerQuestions.findAll({
			where: {PartnerId: partnerId},
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
		res.json({
			status: true,
			data: questions,
		});
	} catch (error) {
		handleError(res, error);
	}
};

export const updateQuestionPartner = async (req: Request, res: Response) => {
	try {
		const {data} = req.body;

		if (!data) {
			res.status(400).json({
				status: false,
				message: "No hay información para agregar",
			});
			return;
		}

		//VALIDATE FIELDS
		if (!data.partnerId) {
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

		await PartnerQuestions.destroy({
			where: {
				PartnerId: data.partnerId,
			},
		});

		const {partnerId, questions} = data;

		questions.map(async (question: any) => {
			const questionExist: any = await Question.findOne({
				where: {
					id: question.questionId,
				},
			});

			// if (!questionExist) {
			// 	res.status(400).json({
			// 		status: false,
			// 		message: `La pregunta con id ${question.questionId} no existe`,
			// 	});
			// }

			PartnerQuestions.create({
				QuestionId: questionExist!.id,
				online: question.online,
				PartnerId: partnerId,
				CategoryId: questionExist!.CategoryId,
			});
		});

		res.json(true);
	} catch (error) {
		handleError(res, error);
	}
};
