import { Router } from 'express';
import { handle } from '../../utils/errorsHandlers';
import handlePostAddCollaboration, {
  swaggerPaths as postAddCollaborationPaths
} from './postAddCollaboration';
import handleDeleteRemoveCollaboration, {
  swaggerPaths as deleteRemoveCollaborationPaths
} from './deleteRemoveCollaborator';

export const swaggerPaths = {
  '/collaborators/add': {
    post: postAddCollaborationPaths
  },
  '/collaborators/remove': {
    delete: deleteRemoveCollaborationPaths
  }
};

const router = Router();

router.post('/add', handle(handlePostAddCollaboration));
router.delete('/remove', handle(handleDeleteRemoveCollaboration));

export default router;
