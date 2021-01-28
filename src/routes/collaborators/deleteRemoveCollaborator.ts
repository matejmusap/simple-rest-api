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

  return res.redirect(`/user/home/${userId}`);
}

export const swaggerPaths = {
  tags: ['Collaborations'],
  summary: 'Delete Collaborations with another user',
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
