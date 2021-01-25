import { Request, Response, NextFunction } from 'express';
import { badRequest } from '../../utils/errorsHandlers';
import { PgClient } from '../../models';

const getUser = async (userId: string, pg: PgClient) => {
  const queryGetUser = `SELECT * FROM "users" WHERE "id"='${userId}'`;
  const userResponse: any = await pg.runQuery(queryGetUser);
  const user: any = userResponse.rows[0];
  console.log(user);
  console.log(user.id);
  return user;
};

export default async function handlePutAddCollaborator(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  let collaborator;
  const pg = new PgClient(false);

  const userId = req.cookies['userId'];
  const user = await getUser(userId, pg);

  if (user) {
    if (req.body.addCollaborator) {
      collaborator = await getUser(req.body.addCollaborator, pg);
      const queryUpdateUser = `UPDATE "users" SET "collaborators" = collaborators || '{${collaborator.id}}' WHERE "id"='${userId}'`;
      await pg.runQuery(queryUpdateUser);
    } else if (req.body.removeCollaborators) {
      collaborator = await getUser(req.body.removeCollaborators, pg);
      const queryUpdateUser = `UPDATE "users" SET "collaborators" = collaborators || array_remove(collaborators, '${collaborator.id}') WHERE "id"='${userId}';
      WHERE "id"='${userId}'`;
      await pg.runQuery(queryUpdateUser);
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
