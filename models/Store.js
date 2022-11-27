import Sequelize, {DataTypes} from "sequelize";
import {sequelize} from "../database/database.js";

import {Partner} from "./Partner.js";
// import {Review} from "./Review";

export const Store = sequelize.define("stores", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	partnerID: {
		type: DataTypes.INTEGER,
	},
});
