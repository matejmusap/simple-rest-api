import { Request, Response, NextFunction } from 'express';
import { PgClient } from '../../models';

interface NewComment {
  content: string;
  postId: number;
}

export default async function handlePostComment(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const body: NewComment = req.body;
  const userId = req.cookies['userId'];
  const pg = new PgClient(false);
  const createdAt: number = Date.now();

  const query = `INSERT INTO "comments" (
                "content",
                "userId",
                "postId",
                "createdTime"
                ) VALUES ('${body.content}',
                          '${userId}',
                          ${body.postId},
                          ${createdAt},)
                          RETURNING id;`;

  await pg.runQuery(query);
  res.redirect(`/user/home/${req.cookies['userId']}`);
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
