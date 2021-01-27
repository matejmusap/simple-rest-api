import { Request, Response, NextFunction } from 'express';
import { client } from '../../models';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { badRequest } from '../../utils/errorsHandlers';

require('dotenv').config();

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

  const query = `SELECT * FROM "users" WHERE "email"='${body.email}'`;

  const userResponse: any = await client.responseToData(query);
  const user: any = userResponse[0];
  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.SECRET_TOKEN_KEY || 'my-token-key',
      { expiresIn: 60000 }
    );

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: body.email,
      subject: 'Your Password',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process:
        http://${process.env.IP}:${process.env.PORT}/user/reset/${token} 
        If you did not request this, please ignore this email and your password will remain unchanged.`
    });

    return res.render('forgotMessage');
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
