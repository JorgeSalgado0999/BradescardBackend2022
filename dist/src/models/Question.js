"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../database/database.js"));
const ReviewAnswer_js_1 = __importDefault(require("./ReviewAnswer.js"));
const Question = database_js_1.default.define("questions", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    question: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});
exports.default = Question;
Question.hasMany(ReviewAnswer_js_1.default, {
    foreignKey: "QuestionId",
    sourceKey: "id",
});
ReviewAnswer_js_1.default.belongsTo(Question, {
    foreignKey: "QuestionId",
    targetKey: "id",
});
//# sourceMappingURL=Question.js.map