import { Request, Response, NextFunction } from 'express';
import argon2 from 'argon2';
import { PgClient } from '../../models';
import { nanoid } from 'nanoid';

interface UserRegister {
  email: string;
  username: string;
  password: string;
  admin: boolean;
}

export default async function handlePostRegisterUser(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const pg = new PgClient(false);

  const body: UserRegister = req.body;

  const id: string = nanoid(20);

  const password = await argon2.hash(body.password);

  let admin: boolean = false;

  const queryCountUsers = `SELECT COUNT(*) FROM "users" `;

  const count = await pg.runQuery(queryCountUsers);

  if (count.rows[0].count === '0') {
    admin = true;
  }

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

  await pg.runQuery(query);

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
