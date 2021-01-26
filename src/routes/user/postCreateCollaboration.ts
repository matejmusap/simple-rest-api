import { Request, Response, NextFunction } from 'express';
import { badRequest } from '../../utils/errorsHandlers';
import { client } from '../../models';

const getUser = async (userId: string) => {
  const queryGetUser = `SELECT * FROM "users" WHERE "id"='${userId}'`;
  const userResponse: any = await client.runQuery(queryGetUser);
  const user: any = userResponse.rows[0];
  return user;
};

export default async function handlePostCreateCollaborators(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  let collaborator: any;

  const userId = req.cookies['userId'];
  const user = await getUser(userId);

  if (user) {
    if (req.body.addCollaborator) {
      collaborator = await getUser(req.body.addCollaborator);
      const queryUpdateUser = `UPDATE "users" SET "collaborators" = collaborators || '{${collaborator.id}}' WHERE "id"='${userId}'`;
      console.log(queryUpdateUser);
      await client.runQuery(queryUpdateUser);
    } else if (req.body.removeCollaborator) {
      collaborator = await getUser(req.body.removeCollaborator);
      const queryUpdateUser = `UPDATE "users" SET "collaborators" = collaborators || ARRAY_REMOVE("collaborators", '${collaborator.id}') WHERE "id"='${userId}';`;
      console.log(queryUpdateUser);
      await client.runQuery(queryUpdateUser);
    }
    res.cookie('userId', userId, { httpOnly: true });
    return res.redirect(`/user/home/${req.cookies['userId']}`);
  }
  return badRequest(req, res, 'Update Collaborators failed?');
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
