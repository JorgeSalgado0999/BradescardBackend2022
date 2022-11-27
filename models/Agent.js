import Sequelize, {DataTypes} from "sequelize";
import {sequelize} from "../database/database.js";

export const Agent = sequelize.define("agents", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
