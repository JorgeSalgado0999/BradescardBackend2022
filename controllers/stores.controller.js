import {Partner} from "../models/partner.js";
import {Store} from "../models/store.js";

export const getStores = async (req, res) => {
	const stores = await Store.findAll();
	res.send(stores);
};

export const createStore = async (req, res) => {
	console.log(req.body);
	try {
		const {name, active, partnerID} = req.body;
		const newStore = await Store.create({
			name,
			active,
			partnerID,
		});
		console.log(newStore);
		res.json(newStore);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};
