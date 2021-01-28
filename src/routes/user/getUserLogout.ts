import { Request, Response, NextFunction } from 'express';

export default function handleGetUserLogut(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.redirect('/');
}

export const swaggerPaths = {
  tags: ['Main'],
  summary: 'Get to Main Page',
  produces: ['application/json'],
  responses: {
    200: { description: 'Redirect to main page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
