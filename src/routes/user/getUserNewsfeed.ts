import { Request, Response, NextFunction } from 'express';
import { client } from '../../models';

require('dotenv').config();

export default async function handleGetUserNewsfeed(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const getAllPostsQuery = `SELECT * FROM "posts`;
  const allPosts = await client.responseToData(getAllPostsQuery);
  return res.render('userNewsfeed', allPosts);
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
