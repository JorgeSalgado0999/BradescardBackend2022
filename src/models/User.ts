import Sequelize, {DataTypes} from "sequelize";
import db from "../database/database";
import UserRole from "./UserRole";

const User = db.define("users", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	nickname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	gender: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
});

UserRole.hasMany(User);
User.belongsTo(UserRole);

export default User;
