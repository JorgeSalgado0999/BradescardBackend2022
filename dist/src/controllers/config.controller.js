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
exports.createStates = exports.createUserRoles = exports.syncDB = void 0;
const securityFunctions_1 = require("../helpers/securityFunctions");
const utils_1 = require("../helpers/utils");
const UserRole_1 = __importDefault(require("../models/UserRole"));
const User_1 = __importDefault(require("../models/User"));
const State_1 = __importDefault(require("../models/State"));
const City_1 = __importDefault(require("../models/City"));
const PostalCode_1 = __importDefault(require("../models/PostalCode"));
const Suburb_1 = __importDefault(require("../models/Suburb"));
const Partner_1 = __importDefault(require("../models/Partner"));
const Store_1 = __importDefault(require("../models/Store"));
const Question_1 = __importDefault(require("../models/Question"));
const QuestionCategory_1 = __importDefault(require("../models/QuestionCategory"));
const PartnerQuestions_1 = __importDefault(require("../models/PartnerQuestions"));
const Review_1 = __importDefault(require("../models/Review"));
const ReviewAnswer_1 = __importDefault(require("../models/ReviewAnswer"));
const syncDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserRole_1.default.sync({ alter: { drop: false } });
        yield User_1.default.sync({ alter: { drop: false } });
        yield State_1.default.sync({ alter: { drop: false } });
        yield City_1.default.sync({ alter: { drop: false } });
        yield PostalCode_1.default.sync({ alter: { drop: false } });
        yield Suburb_1.default.sync({ alter: { drop: false } });
        yield Partner_1.default.sync({ alter: { drop: false } });
        yield Store_1.default.sync({ alter: { drop: false } });
        yield QuestionCategory_1.default.sync({ alter: { drop: false } });
        yield Question_1.default.sync({ alter: { drop: false } });
        yield PartnerQuestions_1.default.sync({ alter: { drop: false } });
        yield Review_1.default.sync({ alter: { drop: false } });
        yield ReviewAnswer_1.default.sync({ alter: { drop: false } });
        res.json({
            status: true,
        });
    }
    catch (ex) {
        (0, securityFunctions_1.handleError)(res, ex);
    }
});
exports.syncDB = syncDB;
const createUserRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = [
            { role: "Admin", hierarchy: 1 },
            { role: "Agent", hierarchy: 2 },
        ];
        for (const role of roles) {
            yield UserRole_1.default.create({
                description: role.role,
                slug: (0, utils_1.createSlug)(role.role),
                hierarchy: role.hierarchy,
            });
        }
        res.json({
            status: true,
        });
    }
    catch (ex) {
        console.log(ex);
        (0, securityFunctions_1.handleError)(res, ex);
    }
});
exports.createUserRoles = createUserRoles;
const createStates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const states = [
            "Aguascalientes",
            "Baja California",
            "Baja California Sur",
            "Campeche",
            "Chiapas",
            "Chihuahua",
            "Coahuila",
            "Colima",
            "Ciudad de México",
            "Durango",
            "Guanajuato",
            "Guerrero",
            "Hidalgo",
            "Jalisco",
            "Estado de México",
            "Michoacán",
            "Morelos",
            "Nayarit",
            "Nuevo León",
            "Oaxaca",
            "Puebla",
            "Querétaro",
            "Quintana Roo",
            "San Luis Potosí",
            "Sinaloa",
            "Sonora",
            "Tabasco",
            "Tamaulipas",
            "Tlaxcala",
            "Veracruz",
            "Yucatán",
            "Zacatecas",
        ];
        for (const state of states) {
            const slug = (0, utils_1.createSlug)(state);
            yield State_1.default.create({ name: state, slug: slug });
        }
        res.json({
            status: true,
        });
    }
    catch (ex) {
        console.log(ex);
        (0, securityFunctions_1.handleError)(res, ex);
    }
});
exports.createStates = createStates;
//# sourceMappingURL=config.controller.js.map