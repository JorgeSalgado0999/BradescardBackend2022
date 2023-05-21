import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database.js";

import Store from "./Store";
import Review from "./Review";

const Partner = db.define("partners", {
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
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
});

Partner.hasMany(Store, {
	foreignKey: "PartnerId",
	sourceKey: "id",
});
Store.belongsTo(Partner, {
	foreignKey: "PartnerId",
	targetKey: "id",
});

//Reviews
Partner.hasMany(Review, {
	foreignKey: "PartnerId",
	sourceKey: "id",
});
Review.belongsTo(Partner, {
	foreignKey: "PartnerId",
	targetKey: "id",
});

Store.hasMany(Review, {
	foreignKey: "StoreId",
	sourceKey: "id",
});
Review.belongsTo(Store, {
	foreignKey: "StoreId",
	targetKey: "id",
});

export default Partner;
