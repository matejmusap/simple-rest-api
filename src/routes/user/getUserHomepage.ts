import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { badRequest } from '../../utils/errorsHandlers';
import { client } from '../../models';

require('dotenv').config();

const responseToData = async (query: any): Promise<any[]> => {
  const response: any = await client.runQuery(query);
  const data = response.rows[0] ? response.rows : [];
  return data;
};

const convert = (array: string[], not: boolean): string => {
  let str: string = '';
  const newArr = array.map((e: any) => {
    if (not) {
      return `AND NOT "id"='${e}'`;
    } else {
      return `AND "id"='${e}'`;
    }
  });
  console.log(newArr);
  for (let query of newArr) {
    console.log(query, 'query');
    console.log(str, 'str');
    str = `${str} ${query}`;
    console.log(str, 'str2');
  }
  return str;
};

export default async function handleGetUserHomepage(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const id = req.params.id;

  const userQuery = `SELECT * FROM "users" WHERE "id"='${id}';`;

  const users: any = await responseToData(userQuery);
  const user: any = users[0];

  const countUsers: string = `SELECT COUNT (*) FROM "users" WHERE NOT "id"='${id}';`;
  const countUsersResponse: any = await client.runQuery(countUsers);
  const count: any = Number(countUsersResponse.rows[0].count);

  if (user) {
    console.log(user.collaborators.length);
    console.log(count);
    let collaboratorsToRemove: string[] = [];
    let collaboratorsToAdd: string[] = [];
    if (!!(user.collaborators && user.collaborators.length !== count)) {
      const collaboratorsToAddQuery = `SELECT * FROM "users" WHERE NOT "id"='${id}'${convert(
        user.collaborators,
        true
      )};`;
      collaboratorsToAdd = await responseToData(collaboratorsToAddQuery);
      console.log(collaboratorsToAddQuery);
    }

    if (!!(user.collaborators && user.collaborators.length)) {
      const collaboratorsToRemoveQuery = `SELECT * FROM "users" WHERE NOT "id"='${id}'${convert(
        user.collaborators,
        false
      )};`;
      collaboratorsToRemove = await responseToData(collaboratorsToRemoveQuery);
      console.log(collaboratorsToRemoveQuery);
    }

    const postsQueries = `SELECT * FROM "posts" WHERE "userId"='${id}';`;
    const commentsQuery = `SELECT * FROM "comments" WHERE "userId"='${id}';`;

    const posts = await responseToData(postsQueries);
    const comments: any = await responseToData(commentsQuery);

    if (req.cookies['my-token']) {
      const decoded: any = jwt.verify(
        req.cookies['my-token'],
        process.env.SECRET_TOKEN_KEY || 'my-token-key'
      );
      console.log(collaboratorsToAdd);
      console.log(collaboratorsToRemove);

      const responseBody = {
        name: decoded.email,
        user: user,
        posts: posts,
        comments: comments,
        collaboratorsToAdd: collaboratorsToAdd,
        collaboratorsToRemove: collaboratorsToRemove
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
  summary: 'Get',
  produces: ['application/json'],
  responses: {
    200: { description: 'OK' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};
