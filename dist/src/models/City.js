"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const Suburb_1 = __importDefault(require("../models/Suburb"));
const City = database_1.default.define('Cities', {
    name: sequelize_1.DataTypes.STRING,
    slug: sequelize_1.DataTypes.STRING
});
City.hasMany(Suburb_1.default);
Suburb_1.default.belongsTo(City);
exports.default = City;
//# sourceMappingURL=City.js.map