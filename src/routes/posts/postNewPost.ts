import { Request, Response, NextFunction } from 'express';
import { Post } from '../../models';

interface NewPost {
  title: string;
  content: string;
}

export default async function handlePostNewForm(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const body: NewPost = req.body;

  const post = Post.build({
    userId: req.cookies['userId'],
    title: body.title,
    content: body.content
  });
  await post.save();
  res.redirect(`/user/home/${req.cookies['userId']}`);
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
