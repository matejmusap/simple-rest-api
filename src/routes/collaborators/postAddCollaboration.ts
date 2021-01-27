import { Request, Response, NextFunction } from 'express';
import { client } from 'src/models';

interface CreateCollaboration {
  collaboratorId: string;
}

export default async function handlePostAddCollaboration(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const body: CreateCollaboration = req.body;

  const userId = req.cookies['userId'];

  const query = `INSERT INTO "collaborators" (
                  "userId",
                  "collaboratorId") VALUES ('${userId}',
                            '${body.collaboratorId}')
                            RETURNING id;`;

  await client.runQuery(query);
  res.cookie('userId', userId, { httpOnly: true });
  res.redirect(`/user/home/${req.cookies['userId']}`);
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
