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
	QuestionId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	comments: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	plan: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	date: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	breach: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default ReviewAnswer;
