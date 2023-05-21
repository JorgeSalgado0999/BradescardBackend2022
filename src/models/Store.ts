import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database.js";

import Partner from "./Partner";
import State from "./State";
import Suburb from "./Suburb";
import PostalCode from "./PostalCode";
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
});

Store.belongsTo(State);
State.hasMany(Store);

Store.belongsTo(Suburb);
Suburb.hasMany(Store);

Store.belongsTo(PostalCode);
PostalCode.hasMany(Store);

export default Store;
