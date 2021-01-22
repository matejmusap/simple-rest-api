import { Model } from 'sequelize';
import { ModelCtor, Sequelize } from 'sequelize';
import { UserModel } from '../models';

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

export default sequelize;
