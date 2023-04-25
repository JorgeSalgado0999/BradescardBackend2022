import { DataTypes } from 'sequelize';
import db from '../database/database';

const UserRole = db.define('UserRoles', {
    description: DataTypes.STRING,
    slug: DataTypes.STRING,
    hierarchy: DataTypes.INTEGER
});

export default UserRole;