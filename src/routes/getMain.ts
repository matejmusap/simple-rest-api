import { Request, Response, NextFunction } from 'express';

export default function handleGetMain(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.render('main');
}

export const swaggerPaths = {
  tags: ['Main'],
  summary: 'Render Main Page',
  produces: ['application/json'],
  responses: {
    200: { description: 'Render main page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
