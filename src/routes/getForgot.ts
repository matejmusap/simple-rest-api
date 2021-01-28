import { Request, Response, NextFunction } from 'express';

export default function hanldeGetForgot(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.render('forgot');
}

export const swaggerPaths = {
  tags: ['Main'],
  summary: 'Render Forgot password Page',
  produces: ['application/json'],
  responses: {
    200: { description: 'Render Forgot page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
