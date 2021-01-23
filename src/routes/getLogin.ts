import { Request, Response, NextFunction } from 'express';

export default function hanldeGetLogin(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.render('login');
}
export const paths = {
  summary: 'Get',
  produces: ['application/json'],
  responses: {
    200: { description: 'OK' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
