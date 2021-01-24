import { Request, Response, NextFunction } from 'express';

export default function hanldeGetForgot(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.render('newPostForm');
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
