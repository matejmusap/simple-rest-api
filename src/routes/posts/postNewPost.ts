import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { client } from '../../models';

interface NewPost {
  title: string;
  content: string;
}

export default async function handlePostNewForm(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  try {
    const body: NewPost = req.body;

    const userId = req.cookies['userId'];

    const createOrEditTime: string = moment().format('MMMM Do YYYY, h:mm:ss a');

    const query = `INSERT INTO "posts" (
                    "userId",
                    "title",
                    "content",
                    "createOrEditTime",
                    "blocked") VALUES ('${userId}',
                              '${body.title}',
                              '${body.content}',
                              '${createOrEditTime}',
                              false)
                              RETURNING id;`;

    await client.runQuery(query);
    res.cookie('userId', userId, { httpOnly: true });
    res.redirect(`/user/home/${req.cookies['userId']}`);
  } catch (err) {
    console.log(err);
  }
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
