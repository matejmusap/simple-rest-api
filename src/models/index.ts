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

User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  as: 'posts'
});
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  as: 'comments'
});
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
  as: 'comments'
});
Post.belongsTo(User, {
  targetKey: 'id'
});
Comment.belongsTo(User, {
  targetKey: 'id'
});
Comment.belongsTo(Post, {
  targetKey: 'id'
});

// const sequilazeInit = () => sequelize.sync({ force: false, logging: false });

export { UserModel, PostModel, CommentModel };

// export default sequilazeInit;
import { Client } from 'pg';
import {
  createUsersTable,
  createCommentsTable,
  createPostsTable
} from './queries/createTableQuries';

class PgClient {
  public client: Client;
  constructor() {
    this.client = new Client({
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'test',
      user: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || ''
    });
    this.connect();
    this.createTables();
  }

  private async connect() {
    await this.client.connect();
    console.log('Connected to PG');
  }

  public async runQuery(query: string) {
    await this.client.query(query);
  }

  public async createTables() {
    try {
      await this.runQuery(createUsersTable);
      await this.runQuery(createPostsTable);
      await this.runQuery(createCommentsTable);
    } catch (err) {
      console.log('Tables and sequances already exists!');
    }
  }
}

const pgClient = async () => {
  const pgInstance = new PgClient();
  return pgInstance.client;
};

export default pgClient;
