import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database.js";

// import {Partner} from "./Partner.js";
// import {Store} from "./Store.js";

const Agency = db.define("agencies", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	slug: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Agency;
