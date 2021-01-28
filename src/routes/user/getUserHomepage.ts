import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { badRequest } from '../../utils/errorsHandlers';
import { client } from '../../models';

require('dotenv').config();

export default async function handleGetUserHomepage(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const id = req.params.id;

  const userQuery = `SELECT * FROM "users" WHERE "id"='${id}';`;
  const getAllUsersQuery = `SELECT COUNT(*) FROM "users" WHERE NOT "id"='${id}';`;

  const userResponse: any = await client.responseToData(userQuery);
  const user: any = userResponse[0];
  const getAllUsers: any = await client.responseToData(getAllUsersQuery);
  const countAllUsers = Number(getAllUsers[0].count);

  if (user) {
    let collaboratorsToRemove: string[] = [];
    let collaboratorsToAdd: string[] = [];
    let notAdmin: string[] = [];

    const collaboratorsQuery = `SELECT "collaboratorId" FROM "collaborators" WHERE "userId"='${id}'`;
    const collaborators = await client.responseToData(collaboratorsQuery);
    const arrayOfIds: string[] = [];
    collaborators.map((e) => {
      arrayOfIds.push(`'${e.collaboratorId}'`);
      return;
    });
    const filterAddUsers = arrayOfIds.length
      ? ` AND NOT "id" IN (${arrayOfIds})`
      : '';

    const filterRemoveUsers = arrayOfIds.length
      ? ` AND "id" IN (${arrayOfIds})`
      : '';

    const collaboratorsToAddQuery = `SELECT * FROM "users" WHERE NOT "id"='${id}' ${filterAddUsers};`;

    collaboratorsToAdd = await client.responseToData(collaboratorsToAddQuery);

    const collaboratorsToRemoveQuery = `SELECT * FROM "users" WHERE NOT "id"='${id}' ${filterRemoveUsers};`;

    collaboratorsToRemove = await client.responseToData(
      collaboratorsToRemoveQuery
    );

    const postsQueries = `SELECT * FROM "posts" WHERE "userId"='${id}';`;
    const commentsQuery = `SELECT * FROM "comments";`;

    const posts = await client.responseToData(postsQueries);
    const comments: any = await client.responseToData(commentsQuery);
    for (let comment of comments) {
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
        name: decoded.email,
        user,
        posts,
        comments,
        countAllUsers,
        collaboratorsToAdd,
        collaboratorsToRemove,
        notAdmin
      };

      res.cookie('userId', user.id, { httpOnly: true });

      return res.render('userHome', responseBody);
    } else {
      return res.redirect('/login');
    }
  }
  return badRequest(req, res, 'No user with id!');
}

export const swaggerPaths = {
  tags: ['User'],
  summary: 'Get user home page',
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
    200: { description: 'Render user home page' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
