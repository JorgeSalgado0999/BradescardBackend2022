import {Sequelize} from "sequelize";
import {SQL_HOST, SQL_PASSWORD, SQL_USER, DATABASE} from "../helpers/constants";

const db = new Sequelize(DATABASE, SQL_USER, SQL_PASSWORD, {
	host: SQL_HOST,
	dialect: "mysql",
});

export default db;
