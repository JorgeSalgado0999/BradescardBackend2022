import {Router} from "express";

import {
	createQuestion,
	getQuestions,
	getQuestionsByCategorie,
} from "../controllers/question.controller";

const QuestionRouter = Router();

QuestionRouter.post("/", createQuestion);

QuestionRouter.get("/", getQuestions);
QuestionRouter.get("/by-category", getQuestionsByCategorie);

export default QuestionRouter;
