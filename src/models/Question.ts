import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database.js";
import Review from "./Review.js";
import ReviewAnswer from "./ReviewAnswer.js";

const Question = db.define("questions", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	question: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Question;

Question.hasMany(ReviewAnswer, {
	foreignKey: "QuestionId",
	sourceKey: "id",
});
ReviewAnswer.belongsTo(Question, {
	foreignKey: "QuestionId",
	targetKey: "id",
});
