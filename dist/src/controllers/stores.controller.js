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
exports.getStores = exports.createStore = void 0;
const sequelize_1 = require("sequelize");
const securityFunctions_1 = require("../helpers/securityFunctions");
const Partner_1 = __importDefault(require("../models/Partner"));
const utils_1 = require("../helpers/utils");
const State_1 = __importDefault(require("../models/State"));
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { data } = req.body;
        const store = {
            name: data.name,
            slug: (0, utils_1.createSlug)(data.name),
            stateId: data.stateId,
            street: data.street,
            exteriorNumber: data.exteriorNumber,
            interiorNumber: data.interiorNumber,
            city: data.city,
            suburb: data.suburb,
            zipCode: data.zipCode,
            partnerId: data.partnerId,
        };
        const _state = yield State_1.default.findOne({ where: { id: store.stateId } });
        console.log(_state);
        // const newStore = await Store.create({
        // 	name,
        // 	active: true,
        // 	partnerID,
        // });
        // console.log(newStore);
        res.json("ok");
    }
    catch (error) {
        (0, securityFunctions_1.handleError)(res, error);
    }
});
exports.createStore = createStore;
const getStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, name } = req.query;
        const _page = page && typeof page == "string" ? parseInt(page) - 1 : 0;
        const _limit = limit && typeof limit == "string" ? parseInt(limit) : 10;
        var where;
        if (name) {
            where = { slug: { [sequelize_1.Op.like]: "%" + name + "%" } };
        }
        const storesFound = yield Partner_1.default.findAll({
            where: where,
            offset: _limit * _page,
            limit: _limit,
        });
        console.log(storesFound);
        const data = storesFound.map((store) => store.get());
        res.json({
            status: true,
            data,
        });
    }
    catch (ex) {
        (0, securityFunctions_1.handleError)(res, ex);
    }
});
exports.getStores = getStores;
//# sourceMappingURL=stores.controller.js.map