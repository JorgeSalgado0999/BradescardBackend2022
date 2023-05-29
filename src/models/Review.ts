import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database.js";
import Partner from "./Partner.js";
import Store from "./Store.js";
import ReviewAnswer from "./ReviewAnswer.js";

// import {Partner} from "./Partner.js";
// import {Store} from "./Store.js";

const Review = db.define("reviews", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	startTime: {
		type: DataTypes.TIME,
		allowNull: false,
	},
	endTime: {
		type: DataTypes.TIME,
		allowNull: false,
	},
	online: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	contactName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

export default Review;

Review.hasMany(ReviewAnswer, {
	foreignKey: "ReviewId",
	sourceKey: "id",
});
ReviewAnswer.belongsTo(Review, {
	foreignKey: "ReviewId",
	targetKey: "id",
});
