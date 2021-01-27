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
  summary: 'Get',
  produces: ['application/json'],
  responses: {
    200: { description: 'OK' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
