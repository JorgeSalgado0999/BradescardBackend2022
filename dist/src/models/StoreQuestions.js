"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../database/database.js"));
const Question_js_1 = __importDefault(require("./Question.js"));
const Store_js_1 = __importDefault(require("./Store.js"));
const StoreQuestions = database_js_1.default.define("storeQuestions", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    online: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
});
exports.default = StoreQuestions;
Question_js_1.default.hasMany(StoreQuestions, {
    foreignKey: "QuestionId",
    sourceKey: "id",
});
StoreQuestions.belongsTo(Question_js_1.default, {
    foreignKey: "QuestionId",
    targetKey: "id",
});
Store_js_1.default.hasMany(StoreQuestions, {
    foreignKey: "StoreId",
    sourceKey: "id",
});
StoreQuestions.belongsTo(Store_js_1.default, {
    foreignKey: "StoreId",
    targetKey: "id",
});
//# sourceMappingURL=StoreQuestions.js.map