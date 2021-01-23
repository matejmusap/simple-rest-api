import { Request, Response, NextFunction } from 'express';
import { badRequest } from '../utils/handlers';
import { User } from '../models';

export default async function handlePostRegisterUser(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const password = req.body.password;

  if (req.body.id) badRequest(req, res, 'Id should not be provided!');
  if (!req.body.email) badRequest(req, res, 'Email should be provided!');
  if (!req.body.username) badRequest(req, res, 'Username should be provided!');

  const user = User.build({
    email: req.body.email,
    username: req.body.username,
    password: password,
    admin: req.body.admin
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
