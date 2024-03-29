import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database";
import Question from "./Question";
import Partner from "./Partner";
import QuestionCategory from "./QuestionCategory";

const PartnerQuestions = db.define("partnerQuestions", {
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

export default PartnerQuestions;

Question.hasMany(PartnerQuestions, {
	foreignKey: "QuestionId",
	sourceKey: "id",
});
PartnerQuestions.belongsTo(Question, {
	foreignKey: "QuestionId",
	targetKey: "id",
});
Partner.hasMany(PartnerQuestions, {
	foreignKey: "PartnerId",
	sourceKey: "id",
});
PartnerQuestions.belongsTo(Partner, {
	foreignKey: "PartnerId",
	targetKey: "id",
});
QuestionCategory.hasMany(PartnerQuestions, {
	foreignKey: "CategoryId",
	sourceKey: "id",
});
PartnerQuestions.belongsTo(QuestionCategory, {
	foreignKey: "CategoryId",
	targetKey: "id",
});
