import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { client } from '../../models';

interface EditPost {
  postId: number;
  content: string;
}

export default async function handlePutEditPost(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const body: EditPost = req.body;
  const userId = req.cookies['userId'];
  const editTime: string = moment().format('MMMM Do YYYY, h:mm:ss a');
  const oldPostQuery = `SELECT * FROM "posts" WHERE "id"=${body.postId};`;
  const oldPostResponse = await client.responseToData(oldPostQuery);
  const oldPost = oldPostResponse[0];

  const query = `INSERT INTO "postHistory" (
    "userId",
    "postId",
    "lastEditTime",
    "oldContent") VALUES ('${userId}',
              ${body.postId},
              '${oldPost.createOrEditTime}',
              '${oldPost.content}')
              RETURNING id;`;

  await client.runQuery(query);

  const updatePostQuery = `UPDATE "posts" SET "content"='${body.content}', "edited"=true, "createOrEditTime"='${editTime}' WHERE "id"=${body.postId}`;
  await client.runQuery(updatePostQuery);

  res.cookie('userId', userId, { httpOnly: true });
  return res.redirect(`/userHomepage/${userId}`);
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
