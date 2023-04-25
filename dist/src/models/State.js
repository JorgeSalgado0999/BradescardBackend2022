"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const City_1 = __importDefault(require("./City"));
const State = database_1.default.define("States", {
    name: sequelize_1.DataTypes.STRING,
    slug: sequelize_1.DataTypes.STRING,
});
State.hasMany(City_1.default);
City_1.default.belongsTo(State);
exports.default = State;
//# sourceMappingURL=State.js.map