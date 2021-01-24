import argon2 from 'argon2';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../models';

export default async function handlePostResetPasswordPage(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const userId = req.cookies['userId'];
  const user: any = await User.findOne({ where: { id: userId } });
  const password = await argon2.hash(req.body.password);
  user.password = password;
  await user.save();
  return res.render('passwordReset');
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
