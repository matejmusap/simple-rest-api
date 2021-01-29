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
  const user: any = await client.getUser(userId);
  const getBlockedIdsQuery = `SELECT id FROM "users" WHERE "blocked"=true;`;
  const getBlockedIds = await client.responseToData(getBlockedIdsQuery);
  const arrayOfIds: string[] = [];
  getBlockedIds.map((e) => {
    arrayOfIds.push(`'${e.id}'`);
    return;
  });
  const filterBlocked = arrayOfIds.length
    ? `WHERE NOT "userId" IN (${arrayOfIds})`
    : '';
  const getAllPostsQuery = `SELECT * FROM "posts" ${filterBlocked} ORDER BY "id" DESC`;
  const getAllCommentsQuery = `SELECT * FROM "comments"`;
  const allPosts = await client.responseToData(getAllPostsQuery);
  const allComments = await client.responseToData(getAllCommentsQuery);

  const getCollaboratorsQuery = `SELECT "userId" FROM "collaborators" WHERE "collaboratorId"='${userId}';`;
  const collaborators = await client.responseToData(getCollaboratorsQuery);
  const collaboratorsIds: string[] = [];
  collaborators.map((e) => {
    collaboratorsIds.push(`${e.userId}`);
    return;
  });

  for (let post of allPosts) {
    if (post.edited) {
      const userEditUsernameQuery = `SELECT "username" FROM "users" WHERE "id"='${post.editUserId}';`;
      const editUsernameResponse = await client.responseToData(
        userEditUsernameQuery
      );
      post.editUsername = editUsernameResponse[0].username;
    }

    post.button = false;

    const buttonConditions: boolean[] = [user.admin, false, false];

    for (let id of collaboratorsIds) {
      if (id === post.userId) {
        buttonConditions[2] = true;
      }
    }
    if (post.userId === user.id) {
      buttonConditions[1] = true;
    }

    if (buttonConditions.includes(true)) {
      post.button = true;
    }
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
      user,
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
  tags: ['User'],
  summary: 'Get user newsfeed',
  produces: ['application/json'],
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
      in: 'cookie',
      name: 'my-token',
      description: 'Unique token thats confirms uses',
      required: true,
      schema: {
        type: 'string',
        value: 'sdgfdsa4879trh/GHIGHD/(E3rg3w7ifiwz78h/gf4IU',
        description: 'Random string',
        default: null
      }
    }
  ],
  responses: {
    200: { description: 'Render newsfeed page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
