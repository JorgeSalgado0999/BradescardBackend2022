import {Router} from "express";
import {
	addQuestionPartner,
	getQuestionsPartner,
	updateQuestionPartner,
} from "../controllers/partnerQuestions.controller";
import {authMiddleware} from "../helpers/securityFunctions";
import Partner from "../models/Partner";

const partnerQuestionRouter = Router();

partnerQuestionRouter.post("/", addQuestionPartner);
partnerQuestionRouter.get("/:partnerId", getQuestionsPartner);
partnerQuestionRouter.put("/", updateQuestionPartner);

export default partnerQuestionRouter;
