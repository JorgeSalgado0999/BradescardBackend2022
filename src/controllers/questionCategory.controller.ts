import {Op} from "sequelize";
import {Request, Response} from "express";
import {handleError} from "../helpers/securityFunctions";

import QuestionCategory from "../models/QuestionCategory";
import CategorieInterface from "../interfaces/Category";
import {createSlug} from "../helpers/utils";

export const createCategory = async (req: Request, res: Response) => {
	try {
		const {data} = req.body;

		if (!data) {
			res.status(400).json({
				status: false,
				message: "No hay información para agregar",
			});
			return;
		}

		const category: CategorieInterface = {
			category: data.category,
			slug: createSlug(data.category),
		};

		//VALIDATE FIELDS
		if (!category.category) {
			res.status(400).json({
				status: false,
				message: "Especifique la categoria",
			});
			return;
		}

		const newCategory = await QuestionCategory.create({
			category: category.category,
			slug: category.slug,
		});
		console.log(newCategory);
		res.json(newCategory);
	} catch (error) {
		handleError(res, error);
	}
};

export const getCategories = async (req: Request, res: Response) => {
	try {
		const {page, limit, name} = req.query;

		const _page = page && typeof page == "string" ? parseInt(page) - 1 : 0;
		const _limit = limit && typeof limit == "string" ? parseInt(limit) : 10;

		var where;

		if (name) {
			where = {slug: {[Op.like]: "%" + name + "%"}};
		}

		const categoriesFound = await QuestionCategory.findAll({
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
