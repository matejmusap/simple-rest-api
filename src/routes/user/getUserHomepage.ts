import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { badRequest } from '../../utils/errorsHandlers';
import { Post, User, Comment } from '../../models';

export default async function handleGetUserHomepage(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const user: any = await User.findOne({
    where: {
      id: req.params.id
    },
    raw: true
  });
  const posts: any = await Post.findAll({
    where: {
      userId: req.params.id
    },
    raw: true
  });
  const comments: any = await Comment.findAll({
    where: {
      userId: req.params.id
    },
    raw: true
  });
  if (posts) user.posts = posts;
  if (comments) user.comments = comments;
  if (user) {
    if (req.cookies['my-token']) {
      const decoded: any = jwt.verify(
        req.cookies['my-token'],
        process.env.SECRET_TOKEN_KEY || 'my-token-key'
      );
      return res.render('userHome', {
        name: decoded.email,
        user: user,
        posts: user.posts,
        comments: user.comments
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
