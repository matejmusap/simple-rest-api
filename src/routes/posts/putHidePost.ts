import { Request, Response, NextFunction } from 'express';
import { client } from '../../models';

interface DeletePost {
  postId: number;
}

export default async function handlePutHidePostPaths(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const userId = req.cookies['userId'];
  const body: DeletePost = req.body;
  const hidePostQuery = `UPDATE "posts" SET "blocked"=true WHERE "id"=${body.postId}`;
  await client.runQuery(hidePostQuery);

  res.cookie('userId', userId, { httpOnly: true });

  return res.redirect(`/user/home/${userId}`);
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
