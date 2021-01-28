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
  const createTime: string = moment().format('MMMM Do YYYY, h:mm:ss a');

  const query = `INSERT INTO "comments" (
                "content",
                "userId",
                "postId",
                "createTime"
                ) VALUES ('${body.content}',
                          '${userId}',
                          ${body.postId},
                          '${createTime}')
                          RETURNING id;`;

  await client.runQuery(query);
  res.redirect(`/user/newsfeed/${req.cookies['userId']}`);
}

export const swaggerPaths = {
  tags: ['Comment'],
  summary: 'Create Comment',
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
    },
    {
      in: 'body',
      name: 'postId',
      description: 'Unique post id',
      required: true,
      schema: {
        type: 'integer',
        value: 1,
        description: 'Unique post id',
        default: null
      }
    },
    {
      in: 'body',
      name: 'content',
      description: 'Text of Comment',
      required: true,
      schema: {
        type: 'string',
        value: 'Some text',
        description: 'Text of post',
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
