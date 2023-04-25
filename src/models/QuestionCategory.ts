import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database.js";
import Question from "./Question.js";

const QuestionCategory = db.define("questionsCategories", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	category: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	slug: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default QuestionCategory;

QuestionCategory.hasMany(Question, {
	foreignKey: "CategoryId",
	sourceKey: "id",
});
Question.belongsTo(QuestionCategory, {
	foreignKey: "CategoryId",
	targetKey: "id",
});
