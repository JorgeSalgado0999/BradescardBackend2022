import { DataTypes } from 'sequelize';
import db from '../database/database';
import PostalCode from './PostalCode';

const Suburb = db.define('Suburbs', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING
});

PostalCode.hasMany(Suburb);
Suburb.belongsTo(PostalCode);

export default Suburb;