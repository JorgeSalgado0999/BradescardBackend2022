"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../database/database.js"));
const Store_1 = __importDefault(require("./Store"));
const Review_1 = __importDefault(require("./Review"));
const Partner = database_js_1.default.define("partners", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});
Partner.hasMany(Store_1.default, {
    foreignKey: "PartnerId",
    sourceKey: "id",
});
Store_1.default.belongsTo(Partner, {
    foreignKey: "PartnerId",
    targetKey: "id",
});
Partner.hasMany(Review_1.default, {
    foreignKey: "PartnerId",
    sourceKey: "id",
});
Store_1.default.hasMany(Review_1.default, {
    foreignKey: "StoreId",
    sourceKey: "id",
});
Review_1.default.belongsTo(Partner, {
    foreignKey: "PartnerId",
    targetKey: "id",
});
Review_1.default.belongsTo(Store_1.default, {
    foreignKey: "StoreId",
    targetKey: "id",
});
exports.default = Partner;
//# sourceMappingURL=Partner.js.map