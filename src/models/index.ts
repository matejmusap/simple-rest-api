import { Client } from 'pg';
import {
  createUsersTable,
  createCommentsTable,
  createPostsTable,
  createPostHistoryTable
} from './queries/createTableQuries';

require('dotenv').config();
export class PgClient {
  public client: Client;
  init: boolean = false;

  constructor(init: boolean) {
    this.init = init;
    this.client = new Client({
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'test',
      user: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || ''
    });
    this.connect();
    if (this.init) {
      this.createTables();
    }
  }

  private async connect() {
    try {
      await this.client.connect();
      console.log('Connected to PG');
    } catch (err) {
      console.log('PG connecting problems');
    }
  }

  public async runQuery(query: string) {
    const result = await this.client.query(query);
    return result;
  }

  public async createTables() {
    try {
      await this.runQuery(createUsersTable);
      await this.runQuery(createPostsTable);
      await this.runQuery(createCommentsTable);
      await this.runQuery(createPostHistoryTable);
    } catch (err) {
      console.log('Tables and sequances already exists!');
    }
  }
}

const pgInitClient = async () => {
  const pgInstance = new PgClient(true);
  return pgInstance.client;
};

export default pgInitClient;
