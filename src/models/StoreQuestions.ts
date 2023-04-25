import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database.js";
import Question from "./Question.js";
import Store from "./Store.js";

const StoreQuestions = db.define("storeQuestions", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	online: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
});

export default StoreQuestions;

Question.hasMany(StoreQuestions, {
	foreignKey: "QuestionId",
	sourceKey: "id",
});
StoreQuestions.belongsTo(Question, {
	foreignKey: "QuestionId",
	targetKey: "id",
});
Store.hasMany(StoreQuestions, {
	foreignKey: "StoreId",
	sourceKey: "id",
});
StoreQuestions.belongsTo(Store, {
	foreignKey: "StoreId",
	targetKey: "id",
});
