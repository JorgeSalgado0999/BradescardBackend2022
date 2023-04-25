import { DataTypes } from 'sequelize';
import db from '../database/database';
import Suburb from '../models/Suburb';



const City = db.define('Cities', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING
});

City.hasMany(Suburb);
Suburb.belongsTo(City);

export default City;