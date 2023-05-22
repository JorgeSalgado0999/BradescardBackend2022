import {Op} from "sequelize";
import {Request, Response} from "express";
import {handleError} from "../helpers/securityFunctions";

import QuestionInterface from "../interfaces/Question";
import Question from "../models/Question";
import QuestionCategory from "../models/QuestionCategory";
import PartnerQuestions from "../models/PartnerQuestions";

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

		const {partner, questions} = data;

		questions.map(async (question: any) => {
			PartnerQuestions.create({
				QuestionId: question.questionId,
				online: question.online,
				PartnerId: partner.id,
			});
		});

		res.json(true);
	} catch (error) {
		handleError(res, error);
	}
};
