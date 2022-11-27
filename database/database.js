import Sequelize from "sequelize";

export const sequelize = new Sequelize("bradescard", "root", "Password", {
	host: "localhost",
	dialect: "mysql",
});
