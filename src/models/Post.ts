import { DataTypes } from 'sequelize';

const Post = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    unqie: true,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

const options = { paranoid: true };

export default {
  table: 'posts',
  Scheme: Post,
  options
};
