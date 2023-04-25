import {Request, Response} from "express";
import {
	sign,
	verify,
	SignOptions,
	VerifyOptions,
	Algorithm,
} from "jsonwebtoken";
import {My_SECRET} from "./constants";

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: any
) => {
	const token = String(req.headers["authorization"]);
	try {
		const user = verify(token, My_SECRET);
		next();
	} catch (ex) {
		const data = {
			errorMessage: "token invalido",
			errorData: ex,
		};
		res.status(401).send(data);
	}
};

export const handleError = (res: Response, ex: any) => {
	console.log(ex);
	const data = {
		errorMessage: ex.Message,
		errorData: ex,
	};
	res.status(500).send(data);
};
