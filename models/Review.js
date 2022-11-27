import Sequelize, {DataTypes} from "sequelize";
import {sequelize} from "../database/database.js";

// import {Partner} from "./Partner.js";
// import {Store} from "./Store.js";

export const Review = sequelize.define("reviews", {
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
});
