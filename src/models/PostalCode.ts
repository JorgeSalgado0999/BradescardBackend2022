import { DataTypes } from 'sequelize';
import db from '../database/database';
import Suburb from '../models/Suburb';

const PostalCode = db.define('PostalCodes', {
    code: DataTypes.STRING
});

export default PostalCode;