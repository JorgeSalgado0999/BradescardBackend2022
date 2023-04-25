"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const constants_1 = require("../helpers/constants");
const db = new sequelize_1.Sequelize(constants_1.DATABASE, constants_1.SQL_USER, constants_1.SQL_PASSWORD, {
    host: constants_1.SQL_HOST,
    dialect: "mysql",
});
exports.default = db;
//# sourceMappingURL=database.js.map