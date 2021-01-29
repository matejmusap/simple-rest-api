import { Request, Response, NextFunction } from 'express';
import { client } from '../../models';

export default async function handleGetEditForm(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const userId = req.cookies['userId'];
  const postId = Number(req.params.postId);
  const postQuery = `SELECT * FROM "posts" WHERE "id"=${postId}`;
  const postResponse: any = await client.responseToData(postQuery);
  const post = postResponse[0];
  const renderBody = { post, userId };
  res.cookie('userId', userId, { httpOnly: true });
  return res.render(`editForm`, renderBody);
}

export const swaggerPaths = {
  tags: ['PostHistory'],
  summary: 'Render edit Post form',
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
      description: 'Text of Post',
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
