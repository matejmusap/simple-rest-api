import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { client } from '../../models';

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
  const createdTime: string = moment().format('MMMM Do YYYY, h:mm:ss a');

  const query = `INSERT INTO "comments" (
                "content",
                "userId",
                "postId",
                "createdTime"
                ) VALUES ('${body.content}',
                          '${userId}',
                          ${body.postId},
                          '${createdTime}')
                          RETURNING id;`;

  await client.runQuery(query);
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
