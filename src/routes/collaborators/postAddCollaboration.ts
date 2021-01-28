import { Request, Response, NextFunction } from 'express';
import { client } from '../../models';

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
  tags: ['Collaborations'],
  summary: 'Create Collaborations with another user',
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
      name: 'collaboratorId',
      description: 'Unique user id of other user',
      required: true,
      schema: {
        type: 'string',
        value: '02588894428963778215',
        description: '20 numbers digit as string',
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
