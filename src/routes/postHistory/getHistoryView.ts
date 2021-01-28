import { Request, Response, NextFunction } from 'express';

export default async function handleGetHistoryView(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const postId = 1;
  return res.redirect(`/postHistory/historyView/${postId}`);
}

export const swaggerPaths = {
  tags: ['PostHistory'],
  summary: 'Create PostHistory and update Post',
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
