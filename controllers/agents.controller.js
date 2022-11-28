import {Partner} from "../models/partner.js";
import {Store} from "../models/store.js";
import {Agent} from "../models/Agent.js";

export const getAgents = async (req, res) => {
	const agents = await Agent.findAll();
	res.send(agents);
};

export const createAgent = async (req, res) => {
	console.log(req.body);
	try {
		const {username} = req.body;
		const newAgent = await Partner.create({
			username,
		});
		res.json(newAgent);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};
