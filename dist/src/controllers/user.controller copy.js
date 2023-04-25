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
exports.createUser = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const securityFunctions_1 = require("../helpers/securityFunctions");
const UserRole_1 = __importDefault(require("../models/UserRole"));
const User_1 = __importDefault(require("../models/User"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll();
        res.json({
            status: true,
            users,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        if (!data) {
            res.status(400).json({
                status: false,
                message: "No hay un usuario para agregar",
            });
            return;
        }
        const { email, password, firstName, lastName, nickname, gender, userRole } = data;
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
        const user = {
            email,
            password: bcryptjs_1.default.hashSync(password),
            firstName,
            lastName,
            nickname,
            gender,
            userRole,
        };
        const _userRole = yield UserRole_1.default.findOne({ where: { slug: user.userRole } });
        if (!_userRole) {
            res.status(400).json({
                status: false,
                message: "El rol de usuario especificado no es valido",
            });
            return;
        }
        const { id: UserRoleId } = _userRole === null || _userRole === void 0 ? void 0 : _userRole.get();
        console.log(UserRoleId);
        const userInsert = yield User_1.default.create({
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            nickname: user.nickname,
            gender: user.gender,
            UserRoleId: UserRoleId,
        });
        const { id: UserId } = userInsert.get();
        res.json({
            status: true,
            id: UserId,
        });
    }
    catch (ex) {
        console.log(ex);
        (0, securityFunctions_1.handleError)(res, ex);
    }
});
exports.createUser = createUser;
//# sourceMappingURL=user.controller%20copy.js.map