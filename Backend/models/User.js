import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false, validate: { is: /^[a-zA-Z]+$/ } },
  yearOfBirth: { type: DataTypes.INTEGER, allowNull: false, validate: { isNumeric: true } },
  country: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  phone: { type: DataTypes.STRING, allowNull: true, validate: { is: /^[0-9\-()+]+$/ } },
  note: { type: DataTypes.TEXT, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

export default User;
