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
