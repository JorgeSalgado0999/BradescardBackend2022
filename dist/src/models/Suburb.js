"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const PostalCode_1 = __importDefault(require("./PostalCode"));
const Suburb = database_1.default.define('Suburbs', {
    name: sequelize_1.DataTypes.STRING,
    slug: sequelize_1.DataTypes.STRING
});
PostalCode_1.default.hasMany(Suburb);
Suburb.belongsTo(PostalCode_1.default);
exports.default = Suburb;
//# sourceMappingURL=Suburb.js.map