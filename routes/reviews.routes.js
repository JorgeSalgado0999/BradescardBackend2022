import {Router} from "express";

import {getReviews, createReview} from "../controllers/reviews.controller.js";

const router = Router();

router.get("/reviews", getReviews);

router.post("/reviews", createReview);

export default router;
