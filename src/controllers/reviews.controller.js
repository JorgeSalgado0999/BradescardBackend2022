import {Partner} from "../models/partner.js";
import {Store} from "../models/store.js";
import {Agent} from "../models/Agent.js";
import {Review, ReviewSchema} from "../models/Review.js";

export const getReviews = async (req, res) => {
	const reviews = await Review.findAll();
	res.send(reviews);
};

export const createReview = async (req, res) => {
	console.log(req.body);
	try {
		const newReview = ReviewSchema(req.body);
		newReview
			.save()
			.then((data) => res.json(data))
			.catch((err) => console.log(err));
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};
