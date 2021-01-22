import UserModel from './User';
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

const sequilazeInit = () => sequelize.sync({ logging: false });

export { UserModel };

export default sequilazeInit;
