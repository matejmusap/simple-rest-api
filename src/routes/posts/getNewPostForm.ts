import { Request, Response, NextFunction } from 'express';

export default function hanldeGetForgot(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const userId = req.cookies['userId'];

  res.render('newPostForm', { userId });
}

export const swaggerPaths = {
  tags: ['Post'],
  summary: 'Render New Post form',
  produces: ['application/json'],
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
    }
  ],
  responses: {
    200: { description: 'Render New Post page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
