import argon2 from 'argon2';
import { Request, Response, NextFunction } from 'express';
import { badRequest } from '../../utils/errorsHandlers';
import { PgClient } from '../../models';

export default async function handlePutResetPassword(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const pgClient = new PgClient(false);

  const userId = req.cookies['userId'];
  const queryGetUser = `SELECT * FROM "users" WHERE "id"='${userId}'`;
  const userResponse: any = await pgClient.runQuery(queryGetUser);
  const user: any = userResponse.rows[0];
  if (user) {
    const password = await argon2.hash(req.body.password);
    const queryUpdateUser = `UPDATE "users" SET "password"=${password} WHERE "id"='${userId}'`;
    await pgClient.runQuery(queryUpdateUser);
    return res.render('passwordReset');
  }
  return badRequest(req, res, 'No user with id');
}

export const swaggerPaths = {
  summary: 'Get',
  produces: ['application/json'],
  responses: {
    200: { description: 'OK' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
