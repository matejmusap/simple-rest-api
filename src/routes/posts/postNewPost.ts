import { Request, Response, NextFunction } from 'express';
import { PgClient } from '../../models';

interface NewPost {
  title: string;
  content: string;
}

export default async function handlePostNewForm(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const pg = new PgClient(false);

  const body: NewPost = req.body;

  const userId = req.cookies['userId'];

  const createdAt: number = Date.now();

  const query = `INSERT INTO "posts" (
                  "userId",
                  "title",
                  "content",
                  "createdTime") VALUES ('${userId}',
                            '${body.title}',
                            '${body.content}',
                            ${createdAt})
                            RETURNING id;`;

  await pg.runQuery(query);
  res.cookie('userId', userId, { httpOnly: true });
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
