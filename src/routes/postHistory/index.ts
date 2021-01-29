import { Router } from 'express';
import { handle } from '../../utils/errorsHandlers';
import handleGetEditForm, {
  swaggerPaths as getEditFormPaths
} from './getEditForm';
import handlePutEditPost, {
  swaggerPaths as putEditPostPaths
} from './putEditPost';
import handleGetHistoryView, {
  swaggerPaths as getHistoryViewPaths
} from './getHistoryView';

export const swaggerPaths = {
  '/postHistory/editForm/{postId}': {
    get: getEditFormPaths
  },
  '/postHistory/editPost': {
    put: putEditPostPaths
  },
  '/postHistory/historyView/{postId}': {
    get: getHistoryViewPaths
  }
};

const router = Router();

router.get('/editForm/:postId', handle(handleGetEditForm));
router.get('/historyView/:postId', handle(handleGetHistoryView));
router.put('/editPost', handle(handlePutEditPost));

export default router;
