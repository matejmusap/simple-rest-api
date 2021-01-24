import { Request, Response, NextFunction } from 'express';
import { Comment } from '../../models';

interface NewComment {
  content: string;
  postId: number;
}

export default async function handlePostComment(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const body: NewComment = req.body;

  const comment = Comment.build({
    userId: req.cookies['userId'],
    content: body.content,
    postId: body.postId
  });
  await comment.save();
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
