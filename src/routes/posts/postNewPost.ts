import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
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

  const createdTime: string = moment().format('MMMM Do YYYY, h:mm:ss a');

  const query = `INSERT INTO "posts" (
                  "userId",
                  "title",
                  "content",
                  "createdTime") VALUES ('${userId}',
                            '${body.title}',
                            '${body.content}',
                            '${createdTime}')
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
