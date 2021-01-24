import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { badRequest } from '../../utils/errorsHandlers';
import { User } from '../../models';

export default async function handleGetUserHomepage(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const user: any = await User.findOne({
    where: {
      id: req.params.id
    },
    raw: true
  });
  if (user) {
    if (req.cookies['my-token']) {
      const decoded: any = jwt.verify(
        req.cookies['my-token'],
        process.env.SECRET_TOKEN_KEY || 'my-token-key'
      );
      return res.render('userHome', {
        name: decoded.email,
        user: user
      });
    } else {
      return res.redirect('/login');
    }
  } else {
    return badRequest(req, res, 'No user with id!');
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
