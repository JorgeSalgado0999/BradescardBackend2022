import {Request, Response} from "express";
import {handleError} from "../helpers/securityFunctions";
import {createSlug} from "../helpers/utils";
import UserRole from "../models/UserRole";

import User from "../models/User";
import Partner from "../models/Partner";
import Store from "../models/Store";
import Question from "../models/Question";
import QuestionCategory from "../models/QuestionCategory";
import PartnerQuestions from "../models/PartnerQuestions";
import Review from "../models/Review";
import ReviewAnswer from "../models/ReviewAnswer";

export const syncDB = async (req: Request, res: Response) => {
	try {
		await UserRole.sync({alter: {drop: false}});
		await User.sync({alter: {drop: false}});
		await Partner.sync({alter: {drop: false}});
		await Store.sync({alter: {drop: false}});
		await QuestionCategory.sync({alter: {drop: false}});
		await Question.sync({alter: {drop: false}});
		await PartnerQuestions.sync({alter: {drop: false}});
		await Review.sync({alter: {drop: false}});
		await ReviewAnswer.sync({alter: {drop: false}});

		res.json({
			status: true,
		});
	} catch (ex) {
		handleError(res, ex);
	}
};

export const createUserRoles = async (req: Request, res: Response) => {
	try {
		const roles = [
			{role: "Admin", hierarchy: 1},
			{role: "Agent", hierarchy: 2},
		];

		for (const role of roles) {
			await UserRole.create({
				description: role.role,
				slug: createSlug(role.role),
				hierarchy: role.hierarchy,
			});
		}

		res.json({
			status: true,
		});
	} catch (ex) {
		console.log(ex);
		handleError(res, ex);
	}
};

export const createPartners = async (req: Request, res: Response) => {
	try {
		const partners = [
			{name: "C&A"},
			{name: "Bodega Aurrera"},
			{name: "GCC"},
			{name: "Promoda"},
			{name: "Shasa"},
		];

		for (const partner of partners) {
			await Partner.create({
				name: partner.name,
				slug: createSlug(partner.name),
			});
		}

		res.json({
			status: true,
		});
	} catch (ex) {
		console.log(ex);
		handleError(res, ex);
	}
};

export const createCategories = async (req: Request, res: Response) => {
	try {
		const categories = [
			{category: "Seguridad de la información"},
			{category: "Control y Custodia de plásticos"},
			{category: "Productividad"},
			{category: "Control de accesos y seguridad"},
			{category: "Prevención de Fraudes"},
			{category: "Políticas y procedimientos "},
		];

		for (const category of categories) {
			await QuestionCategory.create({
				category: category.category,
				slug: createSlug(category.category),
			});
		}

		res.json({
			status: true,
		});
	} catch (ex) {
		console.log(ex);
		handleError(res, ex);
	}
};

// export const createStates = async (req: Request, res: Response) => {
// 	try {
// 		const states = [
// 			"Aguascalientes",
// 			"Baja California",
// 			"Baja California Sur",
// 			"Campeche",
// 			"Chiapas",
// 			"Chihuahua",
// 			"Coahuila",
// 			"Colima",
// 			"Ciudad de México",
// 			"Durango",
// 			"Guanajuato",
// 			"Guerrero",
// 			"Hidalgo",
// 			"Jalisco",
// 			"Estado de México",
// 			"Michoacán",
// 			"Morelos",
// 			"Nayarit",
// 			"Nuevo León",
// 			"Oaxaca",
// 			"Puebla",
// 			"Querétaro",
// 			"Quintana Roo",
// 			"San Luis Potosí",
// 			"Sinaloa",
// 			"Sonora",
// 			"Tabasco",
// 			"Tamaulipas",
// 			"Tlaxcala",
// 			"Veracruz",
// 			"Yucatán",
// 			"Zacatecas",
// 		];

// 		for (const state of states) {
// 			const slug = createSlug(state);
// 			await State.create({name: state, slug: slug});
// 		}

// 		res.json({
// 			status: true,
// 		});
// 	} catch (ex) {
// 		console.log(ex);
// 		handleError(res, ex);
// 	}
// };
