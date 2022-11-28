import Sequelize, {DataTypes} from "sequelize";
import mongoose from "mongoose";
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

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: false,
		},
	},
	{strict: false}
);
export const ReviewSchema = mongoose.model("reviews", schema);
