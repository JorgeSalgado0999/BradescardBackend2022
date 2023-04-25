import {Router} from "express";

import {createAnswer, getAnswers} from "../controllers/reviewAnswer.controller";

const ReviewAnswersRouter = Router();

ReviewAnswersRouter.post("/", createAnswer);

ReviewAnswersRouter.get("/", getAnswers);

export default ReviewAnswersRouter;
