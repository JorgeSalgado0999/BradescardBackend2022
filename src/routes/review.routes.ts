import {Router} from "express";

import {getReviews, createReview} from "../controllers/review.controller";

const ReviewRouter = Router();

ReviewRouter.get("/", getReviews);

ReviewRouter.post("/", createReview);

export default ReviewRouter;
