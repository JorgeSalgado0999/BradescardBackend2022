import {Partner} from "../models/partner.js";
import {Agent} from "../models/Agent.js";

export const getAgents = async (req, res) => {
	const agents = await Agent.findAll();
	res.send(agents);
};

export const createAgent = async (req, res) => {
	console.log(req.body);
	console.log("entra a crear agente");
	try {
		const {username} = req.body;
		const newAgent = await Agent.create({
			username,
		});
		res.json(newAgent);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};
