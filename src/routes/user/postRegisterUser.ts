import { Request, Response, NextFunction } from 'express';
import argon2 from 'argon2';
import { client } from '../../models';
import randomstring from 'randomstring';

interface UserRegister {
  email: string;
  username: string;
  password: string;
  admin: boolean;
}

const responseToData = async (query: any): Promise<any[]> => {
  const response: any = await client.runQuery(query);
  const data = response.rows[0] ? response.rows : [];
  return data;
};

const checkIfIdIsUnique = async () => {
  let id: any = randomstring.generate({
    length: 20,
    charset: 'numeric'
  });
  const getUserQuery = `SELECT * FROM "users" WHERE "id"='${id}'`;
  const user = await responseToData(getUserQuery);
  if (user === []) {
    checkIfIdIsUnique();
  }
  return String(id);
};

const setAdmin = async (): Promise<boolean> => {
  const queryCountUsers = `SELECT COUNT(*) FROM "users"`;
  const count = await client.runQuery(queryCountUsers);

  if (count.rows[0].count === '0') {
    return true;
  }
  return false;
};

export default async function handlePostRegisterUser(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const body: UserRegister = req.body;

  const password = await argon2.hash(body.password);

  let admin: boolean = await setAdmin();

  const id = await checkIfIdIsUnique();

  const query = `INSERT INTO "users" (
                "id",
                "username",
                "email",
                "password",
                "admin",
                "blocked") VALUES (
                              '${id}',
                              '${body.username}',
                              '${body.email}',
                              '${password}',
                              ${admin},
                              false)
                              RETURNING id;`;

  await client.runQuery(query);

  res.redirect('/');
}

export const swaggerPaths = {
  summary: 'Post',
  produces: ['application/json'],
  responses: {
    200: { description: 'OK' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
