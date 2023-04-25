import {DataTypes} from "sequelize";
import db from "../database/database";
import City from "./City";

const State = db.define("States", {
	name: DataTypes.STRING,
	slug: DataTypes.STRING,
});

State.hasMany(City);
City.belongsTo(State);

export default State;
