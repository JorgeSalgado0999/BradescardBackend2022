import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database.js";

// import {Partner} from "./Partner.js";
// import {Store} from "./Store.js";

const Review = db.define("reviews", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	partnerID: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	storeID: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Review;
