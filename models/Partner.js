import Sequelize, {DataTypes} from "sequelize";
import {sequelize} from "../database/database.js";

import {Store} from "./Store.js";
import {Review} from "./Review.js";

export const Partner = sequelize.define("partners", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
		defaultValue: "url",
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
});

Partner.hasMany(Store, {
	foreignKey: "partnerID",
	sourceKey: "id",
});
Store.belongsTo(Partner, {
	foreignKey: "partnerID",
	targetKey: "id",
});

Partner.hasMany(Review, {
	foreignKey: "partnerID",
	sourceKey: "id",
});
Store.hasMany(Review, {
	foreignKey: "storeID",
	sourceKey: "id",
});

Review.belongsTo(Partner, {
	foreignKey: "partnerID",
	targetKey: "id",
});

Review.belongsTo(Store, {
	foreignKey: "storeID",
	targetKey: "id",
});
