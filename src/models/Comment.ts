import { DataTypes } from 'sequelize';

const Comment = {
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
  postId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

const options = { paranoid: true };

export default {
  table: 'comments',
  Scheme: Comment,
  options
};
