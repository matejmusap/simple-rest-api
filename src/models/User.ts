import { DataTypes } from 'sequelize';

const User = {
  id: {
    type: DataTypes.INTEGER, // uuid
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
  // blocked
};

const options = { paranoid: true };

export default {
  table: 'users',
  Scheme: User,
  options
};
