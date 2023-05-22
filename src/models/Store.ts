import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database.js";

import Partner from "./Partner";
import Review from "./Review";

const Store = db.define("stores", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	slug: DataTypes.STRING,
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	street: DataTypes.STRING,
	exteriorNumber: DataTypes.STRING,
	interiorNumber: DataTypes.STRING,
	state: DataTypes.STRING,
	city: DataTypes.STRING,
	suburb: DataTypes.STRING,
	postalCode: DataTypes.STRING,
});

export default Store;
