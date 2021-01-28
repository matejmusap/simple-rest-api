import { Request, Response, NextFunction } from 'express';
import { client } from '../../models';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { badRequest } from '../../utils/errorsHandlers';

interface LoginUser {
  email: string;
  password: string;
}

export default async function handlePostLoginUser(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const body: LoginUser = req.body;

  const query = `SELECT * FROM "users" WHERE "email"='${body.email}'`;

  const userResponse: any = await client.responseToData(query);
  const user: any = userResponse[0];
  if (user) {
    const valid = await argon2.verify(user.password, body.password);
    if (valid) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.SECRET_TOKEN_KEY || 'my-token-key',
        { expiresIn: 60000 }
      );

      res.cookie('my-token', token, { httpOnly: true });
      res.cookie('userId', user.id, { httpOnly: true });

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
  tags: ['User'],
  summary: 'Login existing user',
  parameters: [
    {
      in: 'body',
      name: 'email',
      description: 'Unique email',
      required: true,
      schema: {
        type: 'string',
        value: 'email@email.com',
        description: 'Must be in email format',
        default: null
      }
    },
    {
      in: 'body',
      name: 'password',
      description: 'Password will be compared to hashed version',
      required: true,
      schema: {
        type: 'string',
        value: 'password',
        description: 'Users password',
        default: null
      }
    }
  ],
  produces: ['application/json'],
  responses: {
    200: { description: 'Redirect to user home page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
