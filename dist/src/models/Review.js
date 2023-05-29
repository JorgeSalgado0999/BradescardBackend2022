"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../database/database.js"));
const ReviewAnswer_js_1 = __importDefault(require("./ReviewAnswer.js"));
// import {Partner} from "./Partner.js";
// import {Store} from "./Store.js";
const Review = database_js_1.default.define("reviews", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    startTime: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    online: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contactName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.default = Review;
Review.hasMany(ReviewAnswer_js_1.default, {
    foreignKey: "ReviewId",
    sourceKey: "id",
});
ReviewAnswer_js_1.default.belongsTo(Review, {
    foreignKey: "ReviewId",
    targetKey: "id",
});
//# sourceMappingURL=Review.js.map