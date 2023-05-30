import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database.js";

// import {Partner} from "./Partner.js";
// import {Store} from "./Store.js";

const ReviewAnswer = db.define("reviewsAnswers", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	status: {
		type: DataTypes.NUMBER,
		allowNull: false,
	},
	comments: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	plan: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	date: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	breach: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});

export default ReviewAnswer;
