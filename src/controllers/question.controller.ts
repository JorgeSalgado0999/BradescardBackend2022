import {Op} from "sequelize";
import {Request, Response} from "express";
import {handleError} from "../helpers/securityFunctions";

import QuestionInterface from "../interfaces/Question";
import Question from "../models/Question";
import QuestionCategory from "../models/QuestionCategory";
import CategorieInterface from "../interfaces/Category";
import CategoryInterface from "../interfaces/Category";
import {createSlug} from "../helpers/utils";

export const createQuestion = async (req: Request, res: Response) => {
	console.log("entró aquí");
	try {
		const {data} = req.body;

		if (!data) {
			res.status(400).json({
				status: false,
				message: "No hay información para agregar",
			});
			return;
		}
		console.log("hay data");

		const question: QuestionInterface = {
			question: data.question,
			CategoryId: data.CategoryId,
			riskLevel: data.riskLevel,
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
		const _category = await QuestionCategory.findOne({
			where: {id: question.CategoryId},
		});
		console.log("category", _category);
		// Here we extract the obtain id and save it as PartnerId
		const {id: CategoryId} = _category?.get();
		console.log("Categoiria correcta");

		const newQuestion = await Question.create({
			question: question.question,
			riskLevel: question.riskLevel,
			slug: createSlug(question.question),
			CategoryId,
		});
		res.json(newQuestion);
	} catch (error) {
		handleError(res, error);
	}
};

export const getQuestions = async (req: Request, res: Response) => {
	try {
		const {page, limit, name} = req.query;

		const _page = page && typeof page == "string" ? parseInt(page) - 1 : 0;
		const _limit = limit && typeof limit == "string" ? parseInt(limit) : 10;

		var where;

		if (name) {
			where = {slug: {[Op.like]: "%" + name + "%"}};
		}

		const questionsFound = await Question.findAll({
			where: where,
			offset: _limit * _page,
			limit: _limit,
			order: [["id", "ASC"]],
		});
		const questions = questionsFound.map((question: any) => question.get());

		const data: any = [];

		await Promise.all(
			questions.map(async (question: any) => {
				const currentCategory: any = await QuestionCategory.findOne({
					where: {id: question.CategoryId},
					attributes: ["category"],
				});
				console.log("currentCategory", currentCategory);
				data.push({
					id: question.id,
					question: question.question,
					category: currentCategory.category,
					riskLevel: question.riskLevel,
				});
			})
		);

		res.json({
			status: true,
			data,
		});
	} catch (ex) {
		handleError(res, ex);
	}
};

export const getQuestionsByCategorie = async (req: Request, res: Response) => {
	try {
		let data: any = {};
		// first get all categories
		const categoriesFound = await QuestionCategory.findAll({
			attributes: ["id", "category"],
			order: [["id", "ASC"]],
		});
		const categories = categoriesFound.map((categorie: any) => categorie.get());

		//This was necesary to avoid disorder
		categories.map((category: any) => {
			data[category.category] = {};
		});

		// now we look for all questions for each category
		await Promise.all(
			categories.map(async (category) => {
				const questionsFound = await Question.findAll({
					where: {CategoryId: category.id},
					order: [["id", "ASC"]],
				});
				const tempData = questionsFound.map((question: any) => question.get());

				data[category.category] = {
					id: category.id,
					questions: tempData,
				};
			})
		);

		res.json({
			status: true,
			data,
		});
	} catch (ex) {
		handleError(res, ex);
	}
};
