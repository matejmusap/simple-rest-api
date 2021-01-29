import { Request, Response, NextFunction } from 'express';
import { badRequest } from '../../utils/errorsHandlers';
import { client } from '../../models';

export default async function handleDeletePost(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  try {
    const userId = req.cookies['userId'];
    console.log;
    console.log(req.body);
    console.log(req.params);
    const deletePost = `DELETE FROM "posts" WHERE "id"=${Number(
      req.params.postId
    )};`;
    await client.runQuery(deletePost);

    res.cookie('userId', userId, { httpOnly: true });
    return res.redirect(`/user/newsFeed/${userId}`);
  } catch (err) {
    return badRequest(req, res, 'Problem with deleting post!');
  }
}

export const swaggerPaths = {
  tags: ['Post'],
  summary: 'Delete Post with comments',
  parameters: [
    {
      in: 'cookie',
      name: 'userId',
      description: 'Unique user id',
      required: true,
      schema: {
        type: 'string',
        value: '02588894428963778215',
        description: '20 numbers digit as string',
        default: null
      }
    },
    {
      in: 'path',
      name: 'postId',
      description: 'Unique post id',
      required: true,
      schema: {
        type: 'ineteger',
        value: 1,
        description: 'Post id',
        default: null
      }
    }
  ],
  produces: ['application/json'],
  responses: {
    200: { description: 'Redirect to User News Page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
