"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const Question_1 = __importDefault(require("./Question"));
const Partner_1 = __importDefault(require("./Partner"));
const PartnerQuestions = database_1.default.define("partnerQuestions", {
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
exports.default = PartnerQuestions;
Question_1.default.hasMany(PartnerQuestions, {
    foreignKey: "QuestionId",
    sourceKey: "id",
});
PartnerQuestions.belongsTo(Question_1.default, {
    foreignKey: "QuestionId",
    targetKey: "id",
});
Partner_1.default.hasMany(PartnerQuestions, {
    foreignKey: "PartnerId",
    sourceKey: "id",
});
PartnerQuestions.belongsTo(Partner_1.default, {
    foreignKey: "PartnerId",
    targetKey: "id",
});
//# sourceMappingURL=PartnerQuestions.js.map