import { Request, Response, NextFunction } from 'express';
import { client } from 'src/models';

interface DeletePost {
  postId: number;
}

export default async function handleDeletePost(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const userId = req.cookies['userId'];
  const body: DeletePost = req.body;
  const deletePost = `DELETE FROM "posts" WHERE "id"=${body.postId};`;
  await client.runQuery(deletePost);

  res.cookie('userId', userId, { httpOnly: true });

  return res.redirect(`/userHomepage/${userId}`);
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
