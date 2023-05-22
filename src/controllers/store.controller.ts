import {Op} from "sequelize";
import {Request, Response} from "express";
import {handleError} from "../helpers/securityFunctions";

import Partner from "../models/Partner";
import Store from "../models/Store";
import StoreInterface from "../interfaces/Store";
import {createSlug} from "../helpers/utils";

export const createStore = async (req: Request, res: Response) => {
	try {
		const {data} = req.body;
		const store: StoreInterface = {
			name: data.name,
			slug: createSlug(data.name),
			state: data.state,
			city: data.city,
			street: data.street,
			exteriorNumber: data.exteriorNumber,
			interiorNumber: data.interiorNumber,
			suburb: data.suburb,
			postalCode: data.postalCode,
			partnerId: data.partnerId,
		};

		const _partner = await Partner.findOne({where: {id: store.partnerId}});
		// Here we extract the obtain id and save it as PartnerId
		const {id: PartnerId} = _partner?.get();
		// console.log("\n\n\n\n\n\n\n\nTodo bien con el partner: ", PartnerId);

		// Set Active true as default
		const active = true;

		const newStore = await Store.create({
			name: store.name,
			slug: store.slug,
			active: active,
			street: store.street,
			exteriorNumber: store.exteriorNumber,
			interiorNumber: store.interiorNumber,
			postalCode: store.postalCode,
			state: store.state,
			city: store.city,
			suburb: store.suburb,

			PartnerId,
		});

		res.json(newStore);
	} catch (error) {
		handleError(res, error);
	}
};

export const getStores = async (req: Request, res: Response) => {
	try {
		const {page, limit, partnerId} = req.query;
		console.log(req.query);

		const _page = page && typeof page == "string" ? parseInt(page) - 1 : 0;
		const _limit = limit && typeof limit == "string" ? parseInt(limit) : 10;

		var where;

		if (partnerId) {
			where = {PartnerId: partnerId};
		}

		const storesFound = await Store.findAll({
			where: where,
			offset: _limit * _page,
			limit: _limit,
		});
		// console.log(storesFound);
		const data = storesFound.map((store) => store.get());

		res.json({
			status: true,
			data,
		});
	} catch (ex) {
		handleError(res, ex);
	}
};
