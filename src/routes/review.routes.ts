import {Router} from "express";

import {
	getReviews,
	createReview,
	getReviewQuestions,
} from "../controllers/review.controller";

const ReviewRouter = Router();

ReviewRouter.get("/", getReviews);
ReviewRouter.post("/", createReview);

ReviewRouter.get("/questions", getReviewQuestions);

export default ReviewRouter;
