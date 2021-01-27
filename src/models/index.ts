import { Client } from 'pg';
import {
  createUsersTable,
  createCommentsTable,
  createPostsTable,
  createPostHistoryTable,
  createCollaboratorsTable
} from './queries/createTableQuries';
import randomstring from 'randomstring';

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

  public async setAdmin(): Promise<boolean> {
    const queryCountUsers = `SELECT COUNT(*) FROM "users"`;
    const count = await this.runQuery(queryCountUsers);

    if (count.rows[0].count === '0') {
      return true;
    }
    return false;
  }

  public async responseToData(query: string): Promise<any[]> {
    const response: any = await this.runQuery(query);
    const data = response.rows[0] ? response.rows : [];
    return data;
  }

  public async checkIfIdIsUnique(): Promise<string> {
    let id: any = randomstring.generate({
      length: 20,
      charset: 'numeric'
    });
    const getUserQuery = `SELECT * FROM "users" WHERE "id"='${id}'`;
    const user = await this.responseToData(getUserQuery);
    if (user === []) {
      this.checkIfIdIsUnique();
    }
    return String(id);
  }

  private async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log('Connected to PG');
    } catch (err) {
      console.log('PG connecting problems');
    }
  }

  public async runQuery(query: string): Promise<any> {
    const result: any = await this.client.query(query);
    return result;
  }

  private async createTables(): Promise<void> {
    try {
      await this.runQuery(createUsersTable);
      await this.runQuery(createPostsTable);
      await this.runQuery(createCommentsTable);
      await this.runQuery(createPostHistoryTable);
      await this.runQuery(createCollaboratorsTable);
    } catch (err) {
      console.log('Tables and sequances already exists!');
    }
  }
}

const pgInitClient = async () => {
  const pgInstance = new PgClient(true);
  return pgInstance.client;
};

export const client: PgClient = new PgClient(false);

export default pgInitClient;
