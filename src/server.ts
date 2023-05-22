import express, {Application} from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import db from "./database/database";
import {PORT} from "./helpers/constants";

import configRouter from "./routes/config.routes";
import {authMiddleware} from "./helpers/securityFunctions";
import UserRouter from "./routes/users.routes";
import AuthRouter from "./routes/auth.routes";
import PartnerRouter from "./routes/partner.routes";
import StoreRouter from "./routes/store.routes";
import QuestionCategoryRouter from "./routes/questionCategory.routes";
import QuestionRouter from "./routes/question.routes";
import ReviewRouter from "./routes/review.routes";
import partnerQuestionRouter from "./routes/partnerQuestions.routes";

class Server {
	public app: Application;
	private port: number;
	private apiPaths: {[key: string]: string};

	constructor() {
		this.app = express();
		this.port = PORT;
		this.apiPaths = {
			config: "/config/",
			auth: "/auth/",
			user: "/user/",
			partner: "/partner/",
			store: "/store/",
			questionategory: "/question-category/",
			question: "/question/",
			questionPartner: "/question-partner/",
			review: "/review/",
		};

		this.dbConnection();
		this.middlewares();
		this.routes();
	}

	private async dbConnection() {
		try {
			await db.authenticate();
			console.log("Database online");
		} catch (error: any) {
			console.log("Problems with database");
			throw new Error(error);
		}
	}

	private middlewares() {
		this.app.use(cors());
		this.app.use(express.json({limit: "50mb"}));
		this.app.use(express.urlencoded({limit: "50mb"}));
	}

	private routes() {
		this.app.get("", (req, res, next) => {
			return res.status(200).json({
				message: "Hello from root!",
			});
		});
		this.app.use(this.apiPaths.config, configRouter);
		this.app.use(this.apiPaths.auth, AuthRouter);
		this.app.use(this.apiPaths.user, UserRouter);
		this.app.use(this.apiPaths.partner, PartnerRouter);
		this.app.use(this.apiPaths.store, StoreRouter);
		this.app.use(this.apiPaths.questionategory, QuestionCategoryRouter);
		this.app.use(this.apiPaths.question, QuestionRouter);
		this.app.use(this.apiPaths.review, ReviewRouter);
		this.app.use(this.apiPaths.questionPartner, partnerQuestionRouter);
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en puerto " + this.port);
		});
	}
}

export default Server;
