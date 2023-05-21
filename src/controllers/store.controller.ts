import {Op} from "sequelize";
import {Request, Response} from "express";
import {handleError} from "../helpers/securityFunctions";

import Partner from "../models/Partner";
import Store from "../models/Store";
import StoreInterface from "../interfaces/Store";
import {createSlug} from "../helpers/utils";
import State from "../models/State";
import City from "../models/City";
import PostalCode from "../models/PostalCode";
import Suburb from "../models/Suburb";

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

		// Validate Partner
		const _partner = await Partner.findOne({where: {id: store.partnerId}});
		// Here we extract the obtain id and save it as PartnerId
		const {id: PartnerId} = _partner?.get();
		console.log("\n\n\n\n\n\n\n\nTodo bien con el partner: ", PartnerId);

		// Validate State
		const slugState = createSlug(store.state);
		const _state = await State.findOne({where: {slug: slugState}});
		// Here we extract the obtain id and save it as StateId
		const {id: StateId} = _state?.get();
		console.log("\n\nTodo bien con el State");

		// Validate City
		const slugCity = createSlug(store.city);
		var CityId;
		var _city = await City.findOne({where: {slug: slugCity, StateId: StateId}});
		if (!_city) {
			const newCity = await City.create({
				name: store.city,
				slug: slugCity,
				StateId: StateId,
			});
			const __city = newCity.get();
			CityId = __city["id"];
		} else {
			const __city = _city.get();
			CityId = __city["id"];
		}
		console.log("\n\nTodo bien con la city");

		// Validate PostalCode
		var _postalCode = await PostalCode.findOne({
			where: {code: store.postalCode},
		});
		var PostalCodeId;
		if (!_postalCode) {
			const newPostalCode = await PostalCode.create({code: store.postalCode});
			const __postalCode = newPostalCode?.get();
			PostalCodeId = __postalCode["id"];
		} else {
			const __postalCode = _postalCode?.get();
			PostalCodeId = __postalCode["id"];
		}
		console.log("\n\nTodo bien con el postalCode");

		// Validate Suburb
		const slugSuburb = "" + createSlug(store.suburb);
		var SuburbId;
		var _suburb = await Suburb.findOne({
			where: {slug: slugSuburb, CityId: CityId},
		});
		if (!_suburb) {
			const newSuburb = await Suburb.create({
				name: store.suburb,
				slug: slugSuburb,
				PostalCodeId: PostalCodeId,
				CityId: CityId,
			});
			const __suburb = newSuburb?.get();
			SuburbId = __suburb["id"];
		} else {
			const __suburb = _suburb?.get();
			SuburbId = __suburb["id"];
		}
		console.log("\n\nTodo bien con el suburb");

		// Set Active true as default
		const active = true;

		const newStore = await Store.create({
			name: store.name,
			slug: store.slug,
			active: active,
			street: store.street,
			exteriorNumber: store.exteriorNumber,
			interiorNumber: store.interiorNumber,

			PostalCodeId,
			PartnerId,
			StateId,
			CityId,
			SuburbId,
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
