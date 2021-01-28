import { Request, Response, NextFunction } from 'express';
import { badRequest } from '../../utils/errorsHandlers';
import { client } from '../../models';

export default async function handlePutAddAdmin(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const userId = req.cookies['userId'];
  const body = req.body;
  const queryGetUser = `SELECT * FROM "users" WHERE "id"='${body.userId}'`;
  const userResponse: any = await client.runQuery(queryGetUser);
  const user: any = userResponse.rows[0];
  if (user) {
    const blockUpdate: boolean = !user.blocked;
    const queryUpdateUser = `UPDATE "users" SET "blocked"=${blockUpdate} WHERE "id"='${body.userId}'`;
    await client.runQuery(queryUpdateUser);
    res.cookie('userId', userId, { httpOnly: true });
    res.redirect(`/user/home/${req.cookies['userId']}`);
  }

  return badRequest(req, res, 'No user with id');
}

export const swaggerPaths = {
  tags: ['User'],
  summary: 'Update blocked field in User',
  parameters: [
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
    200: { description: 'Redirect to User home Page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
