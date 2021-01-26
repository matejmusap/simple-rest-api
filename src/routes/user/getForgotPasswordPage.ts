import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { badRequest } from '../../utils/errorsHandlers';
require('dotenv').config();

export default async function handleGetResetPasswordPage(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  try {
    if (req.params.token) {
      const decoded: any = jwt.verify(
        req.params.token,
        process.env.SECRET_TOKEN_KEY || 'my-token-key'
      );
      res.cookie('userId', decoded.id, { maxAge: 10000, httpOnly: true });
      res.cookie('my-token', req.params.token, {
        maxAge: 10000,
        httpOnly: true
      });
      console.log(decoded);
      return res.render('resetPasswordPage', {
        name: decoded.email
      });
    }
  } catch (err) {
    return badRequest(req, res, err);
  }
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
