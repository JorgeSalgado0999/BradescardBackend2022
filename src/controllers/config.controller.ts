import {Request, Response} from "express";
import {handleError} from "../helpers/securityFunctions";
import {createSlug} from "../helpers/utils";
import UserRole from "../models/UserRole";

import User from "../models/User";
import State from "../models/State";
import City from "../models/City";
import PostalCode from "../models/PostalCode";
import Suburb from "../models/Suburb";
import Partner from "../models/Partner";
import Store from "../models/Store";
import Question from "../models/Question";
import QuestionCategory from "../models/QuestionCategory";
import StoreQuestions from "../models/StoreQuestions";

export const syncDB = async (req: Request, res: Response) => {
	try {
		await UserRole.sync();
		await User.sync();
		await State.sync();
		await City.sync();
		await PostalCode.sync();
		await Suburb.sync();
		await Partner.sync();
		await Store.sync();
		await QuestionCategory.sync();
		await Question.sync();
		await StoreQuestions.sync();

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
			await Partner.create({name: partner.name});
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
			await QuestionCategory.create({name: category.category});
		}

		res.json({
			status: true,
		});
	} catch (ex) {
		console.log(ex);
		handleError(res, ex);
	}
};

export const createStates = async (req: Request, res: Response) => {
	try {
		const states = [
			"Aguascalientes",
			"Baja California",
			"Baja California Sur",
			"Campeche",
			"Chiapas",
			"Chihuahua",
			"Coahuila",
			"Colima",
			"Ciudad de México",
			"Durango",
			"Guanajuato",
			"Guerrero",
			"Hidalgo",
			"Jalisco",
			"Estado de México",
			"Michoacán",
			"Morelos",
			"Nayarit",
			"Nuevo León",
			"Oaxaca",
			"Puebla",
			"Querétaro",
			"Quintana Roo",
			"San Luis Potosí",
			"Sinaloa",
			"Sonora",
			"Tabasco",
			"Tamaulipas",
			"Tlaxcala",
			"Veracruz",
			"Yucatán",
			"Zacatecas",
		];

		for (const state of states) {
			const slug = createSlug(state);
			await State.create({name: state, slug: slug});
		}

		res.json({
			status: true,
		});
	} catch (ex) {
		console.log(ex);
		handleError(res, ex);
	}
};
