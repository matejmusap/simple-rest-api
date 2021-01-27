import { Request, Response, NextFunction } from 'express';
import { client } from '../../models';

interface DeleteCollaboration {
  collaboratorId: string;
}

export default async function handleDeleteRemoveCollaboration(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const userId = req.cookies['userId'];
  const body: DeleteCollaboration = req.body;
  const deletePost = `DELETE FROM "collaborators" WHERE "userId"='${userId}' AND "collaboratorId" = '${body.collaboratorId}';`;
  await client.runQuery(deletePost);

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
