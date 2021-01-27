import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { badRequest } from '../../utils/errorsHandlers';
import { client } from '../../models';

require('dotenv').config();

export default async function handleGetUserNewsfeed(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const userId = req.cookies['userId'];

  const getAllPostsQuery = `SELECT * FROM "posts"`;
  const getAllCommentsQuery = `SELECT * FROM "comments"`;
  const allPosts = await client.responseToData(getAllPostsQuery);
  const allComments = await client.responseToData(getAllCommentsQuery);
  for (let post of allPosts) {
    const getUsernameQuery = `SELECT "username" FROM "users" WHERE "id"='${post.userId}'`;
    const usernameResponse = await client.responseToData(getUsernameQuery);
    const username = usernameResponse[0].username;
    post.author = username;
  }
  for (let comment of allComments) {
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
      allPosts,
      allComments,
      userId
    };
    return res.render('userNewsfeed', responseBody);
  } else {
    return badRequest(req, res, 'Problem with token!');
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
