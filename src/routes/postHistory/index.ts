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
  '/postHistory/new/{postId}': {
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

router.get('/new/:postId', handle(handleGetEditForm));
router.get('/historyView/:postId', handle(handleGetHistoryView));
router.put('/editPost', handle(handlePutEditPost));

export default router;
