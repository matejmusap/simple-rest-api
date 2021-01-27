import { Request, Response, NextFunction } from 'express';
import { badRequest } from '../../utils/errorsHandlers';
import { client } from '../../models';

export default async function handlePutAddAdmin(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const userId = req.cookies['userId'];
  const queryGetUser = `SELECT * FROM "users" WHERE "id"='${userId}'`;
  const userResponse: any = await client.runQuery(queryGetUser);
  const user: any = userResponse.rows[0];
  if (user) {
    const blockUpdate: boolean = !user.blocked;
    const queryUpdateUser = `UPDATE "users" SET "blocked"=${blockUpdate} WHERE "id"='${userId}'`;
    await client.runQuery(queryUpdateUser);
    res.cookie('userId', userId, { httpOnly: true });
    res.redirect(`/user/home/${req.cookies['userId']}`);
  }

  res.cookie('userId', user.id, { httpOnly: true });
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