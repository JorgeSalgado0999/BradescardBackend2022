"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../database/database.js"));
const Question_js_1 = __importDefault(require("./Question.js"));
const QuestionCategory = database_js_1.default.define("questionsCategories", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = QuestionCategory;
QuestionCategory.hasMany(Question_js_1.default, {
    foreignKey: "CategoryId",
    sourceKey: "id",
});
Question_js_1.default.belongsTo(QuestionCategory, {
    foreignKey: "CategoryId",
    targetKey: "id",
});
//# sourceMappingURL=QuestionCategory.js.map