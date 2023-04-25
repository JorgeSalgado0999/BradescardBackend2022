import {Request, Response} from "express";
import bycrypt from "bcryptjs";
import {
	sign,
	verify,
	SignOptions,
	VerifyOptions,
	Algorithm,
} from "jsonwebtoken";
import {handleError} from "../helpers/securityFunctions";
import UserInterface from "../interfaces/User";
import UserRole from "../models/UserRole";

import User from "../models/User";
import {My_SECRET} from "../helpers/constants";

export const login = async (req: Request, res: Response) => {
	try {
		const {data} = req.body;

		if (!data) {
			res.status(400).json({
				status: false,
				message: "No hay un usuario para verificar",
			});
			return;
		}

		const {email, password} = data;

		if (!email) {
			res.status(400).json({
				status: false,
				message: "Especifique un email",
			});
			return;
		}

		if (!password) {
			res.status(400).json({
				status: false,
				message: "Especifique una contraseña",
			});
			return;
		}

		User.findOne({
			where: {
				email,
			},
		}).then((user: any) => {
			if (!user) {
				res.status(400).json({
					status: false,
					message: "Usuario o contraseña incorrecto",
				});
				return;
			}

			if (!bycrypt.compareSync(password, user.password)) {
				res.status(400).json({
					status: false,
					message: "Usuario o contraseña incorrecto",
				});
				return;
			}

			let userToken = sign(
				{
					email: user.email,
					id: user.id,
				},
				"Brades@ComplianceApp2022#",
				{algorithm: "HS256", expiresIn: "5h"}
			);

			res.json({
				status: true,
				token: userToken,
			});
		});
	} catch (ex) {
		console.log(ex);
		handleError(res, ex);
	}
};
