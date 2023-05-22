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
const securityFunctions_1 = require("../helpers/securityFunctions");
const Partner_1 = __importDefault(require("../models/Partner"));
const Store_1 = __importDefault(require("../models/Store"));
const utils_1 = require("../helpers/utils");
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const store = {
            name: data.name,
            slug: (0, utils_1.createSlug)(data.name),
            state: data.state,
            city: data.city,
            street: data.street,
            exteriorNumber: data.exteriorNumber,
            interiorNumber: data.interiorNumber,
            suburb: data.suburb,
            postalCode: data.postalCode,
            partnerId: data.partnerId,
        };
        const _partner = yield Partner_1.default.findOne({ where: { id: store.partnerId } });
        // Here we extract the obtain id and save it as PartnerId
        const { id: PartnerId } = _partner === null || _partner === void 0 ? void 0 : _partner.get();
        // console.log("\n\n\n\n\n\n\n\nTodo bien con el partner: ", PartnerId);
        // Set Active true as default
        const active = true;
        const newStore = yield Store_1.default.create({
            name: store.name,
            slug: store.slug,
            active: active,
            street: store.street,
            exteriorNumber: store.exteriorNumber,
            interiorNumber: store.interiorNumber,
            postalCode: store.postalCode,
            state: store.state,
            city: store.city,
            suburb: store.suburb,
            PartnerId,
        });
        res.json(newStore);
    }
    catch (error) {
        (0, securityFunctions_1.handleError)(res, error);
    }
});
exports.createStore = createStore;
const getStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, partnerId } = req.query;
        console.log(req.query);
        const _page = page && typeof page == "string" ? parseInt(page) - 1 : 0;
        const _limit = limit && typeof limit == "string" ? parseInt(limit) : 10;
        var where;
        if (partnerId) {
            where = { PartnerId: partnerId };
        }
        const storesFound = yield Store_1.default.findAll({
            where: where,
            offset: _limit * _page,
            limit: _limit,
        });
        // console.log(storesFound);
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
//# sourceMappingURL=store.controller.js.map