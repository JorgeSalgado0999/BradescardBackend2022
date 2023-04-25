import {Request, Response} from "express";
import bycrypt from "bcryptjs";
import {handleError} from "../helpers/securityFunctions";
import UserInterface from "../interfaces/User";
import UserRole from "../models/UserRole";

import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.findAll();
		res.json({
			status: true,
			users,
		});
	} catch (error: any) {
		res.status(500).json({message: error.message});
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const {data} = req.body;

		if (!data) {
			res.status(400).json({
				status: false,
				message: "No hay un usuario para agregar",
			});
			return;
		}

		const {email, password, firstName, lastName, nickname, gender, userRole} =
			data;

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

		if (!firstName || !lastName) {
			res.status(400).json({
				status: false,
				message: "Especifique un nombre y apellido",
			});
			return;
		}

		if (!nickname) {
			res.status(400).json({
				status: false,
				message: "Especifique un nickname",
			});
			return;
		}

		if (!gender) {
			res.status(400).json({
				status: false,
				message: "Especifique un genero",
			});
			return;
		}

		if (!userRole) {
			res.status(400).json({
				status: false,
				message: "Especifique un rol de usuario",
			});
			return;
		}

		const user: UserInterface = {
			email,
			password: bycrypt.hashSync(password),
			firstName,
			lastName,
			nickname,
			gender,
			userRole,
		};

		const _userRole = await UserRole.findOne({where: {slug: user.userRole}});

		if (!_userRole) {
			res.status(400).json({
				status: false,
				message: "El rol de usuario especificado no es valido",
			});
			return;
		}

		const {id: UserRoleId} = _userRole?.get();
		console.log(UserRoleId);

		const userInsert = await User.create({
			email: user.email,
			password: user.password,
			firstName: user.firstName,
			lastName: user.lastName,
			nickname: user.nickname,
			gender: user.gender,
			UserRoleId: UserRoleId,
			active: true,
		});

		const {id: UserId} = userInsert.get();

		res.json({
			status: true,
			id: UserId,
		});
	} catch (ex) {
		console.log(ex);
		handleError(res, ex);
	}
};
