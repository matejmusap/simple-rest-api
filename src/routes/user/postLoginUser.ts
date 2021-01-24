import { Request, Response, NextFunction } from 'express';
import { User } from '../../models';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { badRequest } from '../../utils/errorsHandlers';

interface LoginUSer {
  email: string;
  password: string;
}

export default async function handlePostLoginUser(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const body: LoginUSer = req.body;

  const user: any = await User.findOne({
    where: {
      email: body.email
    },
    raw: true
  });
  if (user) {
    const valid = await argon2.verify(user.password, body.password);
    if (valid) {
      var token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.SECRET_TOKEN_KEY || 'my-token-key',
        { expiresIn: 60000 }
      );

      res.cookie('my-token', token, { httpOnly: true });
      res.cookie('userId', user.id, { httpOnly: true });
      res.cookie('userUsername', user.username, { httpOnly: true });

      return res.send({
        url: `http://${process.env.IP}:${process.env.PORT}/user/home/${user.id}`
      });
    } else {
      return badRequest(req, res, 'Wrong password!');
    }
  }
  return badRequest(req, res, 'No user with provided email');
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
