import { Request, Response, NextFunction } from 'express';
import { client } from '../../models';

export default async function handleGetHidePost(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const userId = req.cookies['userId'];
  const query = req.query;
  console.log(query);
  const postId: string = String(query.postId);
  const blocked = req.query.blocked;
  console.log(blocked);
  const hidePostQuery = `UPDATE "posts" SET "blocked"=${blocked} WHERE "id"=${postId}`;
  await client.runQuery(hidePostQuery);

  res.cookie('userId', userId, { httpOnly: true });

  return res.redirect(`/user/newsfeed/${userId}`);
}

export const swaggerPaths = {
  tags: ['Post'],
  summary: 'Update hide field in Post',
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
      in: 'query',
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
    ,
    {
      in: 'query',
      name: 'blocked',
      description: 'Blocked status of post',
      required: true,
      schema: {
        type: 'boolean',
        value: 1,
        description: 'True or false',
        default: false
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
