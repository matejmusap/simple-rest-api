import { Request, Response, NextFunction } from 'express';

export default function handleGetLogin(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.render('login');
}

export const swaggerPaths = {
  tags: ['Main'],
  summary: 'Render Login Page',
  produces: ['application/json'],
  responses: {
    200: { description: 'Render Login page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
