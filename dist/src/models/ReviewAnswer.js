"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../database/database.js"));
// import {Partner} from "./Partner.js";
// import {Store} from "./Store.js";
const ReviewAnswer = database_js_1.default.define("reviewsAnswers", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    plan: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    breach: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
exports.default = ReviewAnswer;
//# sourceMappingURL=ReviewAnswer.js.map