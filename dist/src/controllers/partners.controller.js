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
exports.getPartnerStores = exports.getPartners = exports.createPartner = void 0;
const sequelize_1 = require("sequelize");
const securityFunctions_1 = require("../helpers/securityFunctions");
const Partner_1 = __importDefault(require("../models/Partner"));
const Store_1 = __importDefault(require("../models/Store"));
const createPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        if (!data) {
            res.status(400).json({
                status: false,
                message: "No hay información para agregar",
            });
            return;
        }
        const partner = {
            name: data.name,
            active: data.active,
        };
        //VALIDATE FIELDS
        if (!partner.name) {
            res.status(400).json({
                status: false,
                message: "Especifique un nombre para el socio",
            });
            return;
        }
        const newPartner = yield Partner_1.default.create(Object.assign({}, partner));
        console.log(newPartner);
        res.json(newPartner);
    }
    catch (error) {
        (0, securityFunctions_1.handleError)(res, error);
    }
});
exports.createPartner = createPartner;
const getPartners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, name } = req.query;
        const _page = page && typeof page == "string" ? parseInt(page) - 1 : 0;
        const _limit = limit && typeof limit == "string" ? parseInt(limit) : 10;
        var where;
        if (name) {
            where = { slug: { [sequelize_1.Op.like]: "%" + name + "%" } };
        }
        const partnersFound = yield Partner_1.default.findAll({
            where: where,
            offset: _limit * _page,
            limit: _limit,
        });
        const data = partnersFound.map((partner) => partner.get());
        res.json({
            status: true,
            data,
        });
    }
    catch (ex) {
        (0, securityFunctions_1.handleError)(res, ex);
    }
});
exports.getPartners = getPartners;
const getPartnerStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const stores = yield Store_1.default.findAll({
        where: { partnerID: id },
    });
    res.json(stores);
});
exports.getPartnerStores = getPartnerStores;
//# sourceMappingURL=partners.controller.js.map