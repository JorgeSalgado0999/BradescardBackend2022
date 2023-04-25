import {Router} from "express";

import {
	createCategory,
	getCategories,
} from "../controllers/questionCategory.controller";

const QuestionCategoryRouter = Router();

QuestionCategoryRouter.post("/", createCategory);

QuestionCategoryRouter.get("/", getCategories);

export default QuestionCategoryRouter;
