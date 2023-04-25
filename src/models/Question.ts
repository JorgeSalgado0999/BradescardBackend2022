import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database.js";

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
