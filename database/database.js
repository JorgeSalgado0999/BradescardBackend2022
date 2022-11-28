import Sequelize from "sequelize";
import mongoose, {connect} from "mongoose";

export const sequelize = new Sequelize("bradescard", "root", "Password", {
	host: "localhost",
	dialect: "mysql",
});

export const mongo = mongoose
	.connect("mongodb://127.0.0.1:27017/compliance")
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log("Error connecting to MongoDB", err);
	});
