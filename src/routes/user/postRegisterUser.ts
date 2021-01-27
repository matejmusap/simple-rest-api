import { Request, Response, NextFunction } from 'express';
import argon2 from 'argon2';
import { client } from '../../models';

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
  const body: UserRegister = req.body;

  const password = await argon2.hash(body.password);

  let admin: boolean = await client.setAdmin();

  const id = await client.checkIfIdIsUnique();

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
