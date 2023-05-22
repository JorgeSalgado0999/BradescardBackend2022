"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../database/database.js"));
const Store = database_js_1.default.define("stores", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    slug: sequelize_1.DataTypes.STRING,
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    street: sequelize_1.DataTypes.STRING,
    exteriorNumber: sequelize_1.DataTypes.STRING,
    interiorNumber: sequelize_1.DataTypes.STRING,
    state: sequelize_1.DataTypes.STRING,
    city: sequelize_1.DataTypes.STRING,
    suburb: sequelize_1.DataTypes.STRING,
    postalCode: sequelize_1.DataTypes.STRING,
});
exports.default = Store;
//# sourceMappingURL=Store.js.map