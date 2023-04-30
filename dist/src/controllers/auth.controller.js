"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const securityFunctions_1 = require("../helpers/securityFunctions");
const User_1 = __importDefault(require("../models/User"));
const roles_1 = require("../helpers/roles");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        if (!data) {
            res.status(400).json({
                status: false,
                message: "No hay un usuario para verificar",
            });
            return;
        }
        const { email, password } = data;
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
        User_1.default.findOne({
            where: {
                email,
            },
        }).then((user) => {
            if (!user) {
                res.status(400).json({
                    status: false,
                    message: "Usuario o contraseña incorrecto",
                });
                return;
            }
            if (!bcryptjs_1.default.compareSync(password, user.password)) {
                res.status(400).json({
                    status: false,
                    message: "Usuario o contraseña incorrecto",
                });
                return;
            }
            let userToken = (0, jsonwebtoken_1.sign)({
                email: user.email,
                id: user.id,
            }, "Brades@ComplianceApp2022#", { algorithm: "HS256", expiresIn: "5h" });
            res.json({
                status: true,
                data: {
                    token: userToken,
                    id: user.id,
                    nickname: user.nickname,
                    role: roles_1.roles[user.UserRoleId],
                },
            });
        });
    }
    catch (ex) {
        console.log(ex);
        (0, securityFunctions_1.handleError)(res, ex);
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map