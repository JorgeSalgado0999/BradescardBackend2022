import {Partner} from "../models/partner.js";
import {Store} from "../models/store.js";

export const getPartners = async (req, res) => {
	const partners = await Partner.findAll();
	res.send(partners);
};

export const createPartner = async (req, res) => {
	console.log(req.body);
	try {
		const {name, image, active} = req.body;
		const newPartner = await Partner.create({
			name,
			image,
			active,
		});
		console.log(newPartner);
		res.json(newPartner);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};

export const getPartnerStores = async (req, res) => {
	const {id} = req.params;
	const stores = await Store.findAll({
		where: {partnerID: id},
	});

	res.json(stores);
};
