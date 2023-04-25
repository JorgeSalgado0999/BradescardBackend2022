import {Router} from "express";

import {createQuestion, getQuestions} from "../controllers/question.controller";

const QuestionRouter = Router();

QuestionRouter.post("/", createQuestion);

QuestionRouter.get("/", getQuestions);

export default QuestionRouter;
