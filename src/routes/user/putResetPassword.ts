import argon2 from 'argon2';
import { Request, Response, NextFunction } from 'express';
import { badRequest } from '../../utils/errorsHandlers';
import { client } from '../../models';

export default async function handlePutResetPassword(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const userId = req.cookies['userId'];
  const queryGetUser = `SELECT * FROM "users" WHERE "id"='${userId}'`;
  const userResponse: any = await client.runQuery(queryGetUser);
  const user: any = userResponse.rows[0];
  if (user) {
    const password = await argon2.hash(req.body.password);
    const queryUpdateUser = `UPDATE "users" SET "password"='${password}' WHERE "id"='${userId}'`;
    await client.runQuery(queryUpdateUser);
    return res.render('passwordReset');
  }
  return badRequest(req, res, 'No user with id');
}

export const swaggerPaths = {
  tags: ['User'],
  summary: 'Send password reset data',
  parameters: [
    {
      in: 'body',
      name: 'password',
      description: 'New password. Will be saved in hased format',
      required: true,
      schema: {
        type: 'string',
        value: 'Newpassord!',
        description: 'New passord',
        default: null
      }
    },
    {
      in: 'cookie',
      name: 'userId',
      description: 'Unique user id',
      required: true,
      schema: {
        type: 'string',
        value: '02588894428963778215',
        description: '20 numbers digit as string',
        default: null
      }
    }
  ],
  produces: ['application/json'],
  responses: {
    200: { description: 'Redirect to PasswordReset Page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
