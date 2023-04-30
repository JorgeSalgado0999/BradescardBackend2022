import {Op} from "sequelize";
import {Request, Response} from "express";
import {handleError} from "../helpers/securityFunctions";

import Partner from "../models/Partner";
import Store from "../models/Store";
import PartnerInterface from "../interfaces/Partner";

export const createPartner = async (req: Request, res: Response) => {
	try {
		const {data} = req.body;

		if (!data) {
			res.status(400).json({
				status: false,
				message: "No hay información para agregar",
			});
			return;
		}

		const partner: PartnerInterface = {
			name: data.name,
			active: data.active,
		};

		//VALIDATE FIELDS
		if (!partner.name) {
			res.status(400).json({
				status: false,
				message: "Especifique un nombre para el socio",
			});
			return;
		}

		const newPartner = await Partner.create({
			...partner,
		});
		console.log(newPartner);
		res.json(newPartner);
	} catch (error) {
		handleError(res, error);
	}
};

export const getPartners = async (req: Request, res: Response) => {
	try {
		const {page, limit, name} = req.query;

		const _page = page && typeof page == "string" ? parseInt(page) - 1 : 0;
		const _limit = limit && typeof limit == "string" ? parseInt(limit) : 10;

		var where;

		if (name) {
			where = {slug: {[Op.like]: "%" + name + "%"}};
		}

		const partnersFound = await Partner.findAll({
			where: where,
			offset: _limit * _page,
			limit: _limit,
		});
		const data = partnersFound.map((partner: any) => partner.get());

		res.json({
			status: true,
			data,
		});
	} catch (ex) {
		handleError(res, ex);
	}
};

export const getPartnerStores = async (req: Request, res: Response) => {
	const {id} = req.params;
	const stores = await Store.findAll({
		where: {partnerID: id},
	});

	res.json(stores);
};
