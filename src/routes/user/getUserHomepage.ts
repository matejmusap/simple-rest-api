import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { badRequest } from '../../utils/errorsHandlers';
import { client } from '../../models';

require('dotenv').config();

export default async function handleGetUserHomepage(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const id = req.params.id;

  const userQuery = `SELECT * FROM "users" WHERE "id"='${id}';`;

  const users: any = await client.responseToData(userQuery);
  const user: any = users[0];

  if (user) {
    let collaboratorsToRemove: string[] = [];
    let collaboratorsToAdd: string[] = [];
    let notAdmin: string[] = [];

    const postsQueries = `SELECT * FROM "posts" WHERE "userId"='${id}';`;
    const commentsQuery = `SELECT * FROM "comments";`;

    const posts = await client.responseToData(postsQueries);
    const comments: any = await client.responseToData(commentsQuery);
    for (let comment of comments) {
      const getUsernameQuery = `SELECT "username" FROM "users" WHERE "id"='${comment.userId}'`;
      const usernameResponse = await client.responseToData(getUsernameQuery);
      const username = usernameResponse[0].username;
      comment.author = username;
    }

    if (req.cookies['my-token']) {
      const decoded: any = jwt.verify(
        req.cookies['my-token'],
        process.env.SECRET_TOKEN_KEY || 'my-token-key'
      );

      const responseBody = {
        name: decoded.email,
        user,
        posts,
        comments,
        collaboratorsToAdd,
        collaboratorsToRemove,
        notAdmin
      };

      res.cookie('userId', user.id, { httpOnly: true });

      return res.render('userHome', responseBody);
    } else {
      return res.redirect('/login');
    }
  }
  return badRequest(req, res, 'No user with id!');
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
