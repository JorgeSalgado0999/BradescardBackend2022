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
exports.createCategories = exports.createPartners = exports.createUserRoles = exports.syncDB = void 0;
const securityFunctions_1 = require("../helpers/securityFunctions");
const utils_1 = require("../helpers/utils");
const UserRole_1 = __importDefault(require("../models/UserRole"));
const User_1 = __importDefault(require("../models/User"));
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
const createPartners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partners = [
            { name: "C&A" },
            { name: "Bodega Aurrera" },
            { name: "GCC" },
            { name: "Promoda" },
            { name: "Shasa" },
        ];
        for (const partner of partners) {
            yield Partner_1.default.create({
                name: partner.name,
                slug: (0, utils_1.createSlug)(partner.name),
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
exports.createPartners = createPartners;
const createCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = [
            { category: "Seguridad de la información" },
            { category: "Control y Custodia de plásticos" },
            { category: "Productividad" },
            { category: "Control de accesos y seguridad" },
            { category: "Prevención de Fraudes" },
            { category: "Políticas y procedimientos " },
        ];
        for (const category of categories) {
            yield QuestionCategory_1.default.create({
                category: category.category,
                slug: (0, utils_1.createSlug)(category.category),
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
exports.createCategories = createCategories;
// export const createStates = async (req: Request, res: Response) => {
// 	try {
// 		const states = [
// 			"Aguascalientes",
// 			"Baja California",
// 			"Baja California Sur",
// 			"Campeche",
// 			"Chiapas",
// 			"Chihuahua",
// 			"Coahuila",
// 			"Colima",
// 			"Ciudad de México",
// 			"Durango",
// 			"Guanajuato",
// 			"Guerrero",
// 			"Hidalgo",
// 			"Jalisco",
// 			"Estado de México",
// 			"Michoacán",
// 			"Morelos",
// 			"Nayarit",
// 			"Nuevo León",
// 			"Oaxaca",
// 			"Puebla",
// 			"Querétaro",
// 			"Quintana Roo",
// 			"San Luis Potosí",
// 			"Sinaloa",
// 			"Sonora",
// 			"Tabasco",
// 			"Tamaulipas",
// 			"Tlaxcala",
// 			"Veracruz",
// 			"Yucatán",
// 			"Zacatecas",
// 		];
// 		for (const state of states) {
// 			const slug = createSlug(state);
// 			await State.create({name: state, slug: slug});
// 		}
// 		res.json({
// 			status: true,
// 		});
// 	} catch (ex) {
// 		console.log(ex);
// 		handleError(res, ex);
// 	}
// };
//# sourceMappingURL=config.controller.js.map