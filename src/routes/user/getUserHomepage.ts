import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { badRequest } from '../../utils/errorsHandlers';
import { PgClient } from '../../models';

export default async function handleGetUserHomepage(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const id = req.params.id;

  const userQuery = `SELECT * FROM "users" WHERE "id"='${id}';`;

  const pg = new PgClient(false);

  const userResponse: any = await pg.runQuery(userQuery);

  if (userResponse.rows[0]) {
    const allUsersQuery = `SELECT * FROM "users" WHERE NOT "id"='${id}'`;
    const allUserResponse: any = await pg.runQuery(allUsersQuery);
    const allUsers = allUserResponse.rows;
    const user = userResponse.rows[0];
    const postsQueries = `SELECT * FROM "posts" WHERE "userId"='${id}';`;
    const postsResponse: any = await pg.runQuery(postsQueries);
    const posts = postsResponse.rows[0] ? postsResponse.rows : [];
    const commentsQuery = `SELECT * FROM "comments" WHERE "userId"='${id}';`;
    const commentsResponse: any = await pg.runQuery(commentsQuery);
    const comments = commentsResponse.rows[0] ? commentsResponse.rows : [];
    if (req.cookies['my-token']) {
      const decoded: any = jwt.verify(
        req.cookies['my-token'],
        process.env.SECRET_TOKEN_KEY || 'my-token-key'
      );
      return res.render('userHome', {
        name: decoded.email,
        user: user,
        posts: posts,
        collaborators: allUsers,
        comments: comments
      });
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
