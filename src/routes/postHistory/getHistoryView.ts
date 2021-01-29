import { Request, Response, NextFunction } from 'express';
import { client } from '../../models';

export default async function handleGetHistoryView(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const postId = req.params.postId;
  const userId = req.cookies['userId'];

  const getPostQuerie = `SELECT * FROM "posts" WHERE "id"=${postId}`;
  const postResponse = await client.responseToData(getPostQuerie);
  const post = postResponse[0];

  const getPostHistoryQueries = `SELECT * FROM "postHistory" WHERE "postId"=${postId} ORDER By "id" DESC`;
  const postHistory: any = await client.responseToData(getPostHistoryQueries);

  for (let edit of postHistory) {
    const getUserQuerie = `SELECT "username" FROM "users" WHERE "id"='${edit.userId}'`;
    const userResponse = await client.responseToData(getUserQuerie);
    const user = userResponse[0].username;
    edit.author = user;
  }

  const renderBody = { postId, userId, postHistory, post };
  res.cookie('userId', userId, { httpOnly: true });
  return res.render(`historyView`, renderBody);
}

export const swaggerPaths = {
  tags: ['PostHistory'],
  summary: 'Render history view',
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
        type: 'integer',
        value: 1,
        description: 'Unique post id',
        default: null
      }
    }
  ],
  produces: ['application/json'],
  responses: {
    200: { description: 'Redirect to User home Page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
