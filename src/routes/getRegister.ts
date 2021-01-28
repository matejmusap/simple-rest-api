import { Request, Response, NextFunction } from 'express';

export default function handleGetRegister(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.render('register');
}

export const swaggerPaths = {
  tags: ['Main'],
  summary: 'Render Register Page',
  produces: ['application/json'],
  responses: {
    200: { description: 'Render register page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
