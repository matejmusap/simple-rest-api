import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import argon2 from 'argon2';

interface UserRegister {
  email: string;
  username: string;
  password: string;
  admin: boolean;
}

export default async function handlePostRegisterUser(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const body: UserRegister = req.body;

  const password = await argon2.hash(body.password);

  const user = User.build({
    email: body.email,
    username: body.username,
    password: password,
    admin: body.admin
  });
  await user.save();
  res.redirect('/');
}

export const swaggerPaths = {
  summary: 'Post',
  produces: ['application/json'],
  responses: {
    200: { description: 'OK' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
