import UserModel from './User';
import PostModel from './Post';
import CommentModel from './Comment';
import { Model, ModelCtor, Sequelize } from 'sequelize';

require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'test',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || ''
});

export const User = sequelize.define(UserModel.table, UserModel.Scheme, {
  ...UserModel.options
}) as ModelCtor<Model<any, any>>;

export const Post = sequelize.define(PostModel.table, PostModel.Scheme, {
  ...PostModel.options
}) as ModelCtor<Model<any, any>>;

export const Comment = sequelize.define(
  CommentModel.table,
  CommentModel.Scheme,
  {
    ...CommentModel.options
  }
) as ModelCtor<Model<any, any>>;

User.hasMany(Post, { foreignKey: 'author', onDelete: 'CASCADE' });
User.hasMany(Comment, { foreignKey: 'author', onDelete: 'CASCADE' });
Post.belongsTo(User, { targetKey: 'username' });
Comment.belongsTo(User, { targetKey: 'username' });

const sequilazeInit = () => sequelize.sync({ force: false, logging: false });

export { UserModel, PostModel, CommentModel };

export default sequilazeInit;
