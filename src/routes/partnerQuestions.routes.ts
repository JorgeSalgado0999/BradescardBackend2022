import {Router} from "express";
import {addQuestionPartner} from "../controllers/partnerQuestions.controller";
import {authMiddleware} from "../helpers/securityFunctions";

const partnerQuestionRouter = Router();

partnerQuestionRouter.post("/", addQuestionPartner);

export default partnerQuestionRouter;
