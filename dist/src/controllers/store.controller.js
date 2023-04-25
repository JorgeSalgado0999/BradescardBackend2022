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
const Store_1 = __importDefault(require("../models/Store"));
const utils_1 = require("../helpers/utils");
const State_1 = __importDefault(require("../models/State"));
const City_1 = __importDefault(require("../models/City"));
const PostalCode_1 = __importDefault(require("../models/PostalCode"));
const Suburb_1 = __importDefault(require("../models/Suburb"));
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
        // Validate Partner
        const _partner = yield State_1.default.findOne({ where: { id: store.partnerId } });
        // Here we extract the obtain id and save it as PartnerId
        const { id: PartnerId } = _partner === null || _partner === void 0 ? void 0 : _partner.get();
        console.log("\n\n\n\n\n\n\n\nTodo bien con el partner: ", PartnerId);
        // Validate State
        const slugState = (0, utils_1.createSlug)(store.state);
        const _state = yield State_1.default.findOne({ where: { slug: slugState } });
        // Here we extract the obtain id and save it as StateId
        const { id: StateId } = _state === null || _state === void 0 ? void 0 : _state.get();
        console.log("\n\nTodo bien con el State");
        // Validate City
        const slugCity = (0, utils_1.createSlug)(store.city);
        var CityId;
        var _city = yield City_1.default.findOne({ where: { slug: slugCity, StateId: StateId } });
        if (!_city) {
            const newCity = yield City_1.default.create({
                name: store.city,
                slug: slugCity,
                StateId: StateId,
            });
            const __city = newCity.get();
            CityId = __city["id"];
        }
        else {
            const __city = _city.get();
            CityId = __city["id"];
        }
        console.log("\n\nTodo bien con la city");
        // Validate PostalCode
        var _postalCode = yield PostalCode_1.default.findOne({
            where: { code: store.postalCode },
        });
        var PostalCodeId;
        if (!_postalCode) {
            const newPostalCode = yield PostalCode_1.default.create({ code: store.postalCode });
            const __postalCode = newPostalCode === null || newPostalCode === void 0 ? void 0 : newPostalCode.get();
            PostalCodeId = __postalCode["id"];
        }
        else {
            const __postalCode = _postalCode === null || _postalCode === void 0 ? void 0 : _postalCode.get();
            PostalCodeId = __postalCode["id"];
        }
        console.log("\n\nTodo bien con el postalCode");
        // Validate Suburb
        const slugSuburb = "" + (0, utils_1.createSlug)(store.suburb);
        var SuburbId;
        var _suburb = yield Suburb_1.default.findOne({
            where: { slug: slugSuburb, CityId: CityId },
        });
        if (!_suburb) {
            const newSuburb = yield Suburb_1.default.create({
                name: store.suburb,
                slug: slugSuburb,
                PostalCodeId: PostalCodeId,
                CityId: CityId,
            });
            const __suburb = newSuburb === null || newSuburb === void 0 ? void 0 : newSuburb.get();
            SuburbId = __suburb["id"];
        }
        else {
            const __suburb = _suburb === null || _suburb === void 0 ? void 0 : _suburb.get();
            SuburbId = __suburb["id"];
        }
        console.log("\n\nTodo bien con el suburb");
        // Set Active true as default
        const active = true;
        const newStore = yield Store_1.default.create({
            name: store.name,
            slug: store.slug,
            active: active,
            street: store.street,
            exteriorNumber: store.exteriorNumber,
            interiorNumber: store.interiorNumber,
            PostalCodeId,
            PartnerId,
            StateId,
            CityId,
            SuburbId,
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
//# sourceMappingURL=store.controller.js.map