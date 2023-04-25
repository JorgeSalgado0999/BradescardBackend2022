"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const UserRole = database_1.default.define('UserRoles', {
    description: sequelize_1.DataTypes.STRING,
    slug: sequelize_1.DataTypes.STRING,
    hierarchy: sequelize_1.DataTypes.INTEGER
});
exports.default = UserRole;
//# sourceMappingURL=UserRole.js.map