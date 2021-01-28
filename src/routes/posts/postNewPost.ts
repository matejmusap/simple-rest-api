import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { client } from '../../models';

interface NewPost {
  title: string;
  content: string;
}

export default async function handlePostNewForm(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  try {
    const body: NewPost = req.body;

    const userId = req.cookies['userId'];

    const createOrEditTime: string = moment().format('MMMM Do YYYY, h:mm:ss a');

    const query = `INSERT INTO "posts" (
                    "userId",
                    "title",
                    "content",
                    "createOrEditTime",
                    "blocked") VALUES ('${userId}',
                              '${body.title}',
                              '${body.content}',
                              '${createOrEditTime}',
                              false)
                              RETURNING id;`;

    await client.runQuery(query);
    res.cookie('userId', userId, { httpOnly: true });
    res.redirect(`/user/home/${req.cookies['userId']}`);
  } catch (err) {
    console.log(err);
  }
}

export const swaggerPaths = {
  tags: ['Post'],
  summary: 'Create Post',
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
      in: 'body',
      name: 'postId',
      description: 'Unique post id',
      required: true,
      schema: {
        type: 'integer',
        value: 1,
        description: 'Unique post id',
        default: null
      }
    },
    {
      in: 'body',
      name: 'content',
      description: 'Text of Post',
      required: true,
      schema: {
        type: 'string',
        value: 'Some text',
        description: 'Text of post',
        default: null
      }
    },
    {
      in: 'body',
      name: 'title',
      description: 'Unique title of post',
      required: true,
      schema: {
        type: 'string',
        value: 'Title',
        description: 'Unique title',
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
