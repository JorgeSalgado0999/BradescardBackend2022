"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const PostalCode = database_1.default.define('PostalCodes', {
    code: sequelize_1.DataTypes.STRING
});
exports.default = PostalCode;
//# sourceMappingURL=PostalCode.js.map