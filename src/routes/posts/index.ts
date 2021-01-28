import { Router } from 'express';
import { handle } from '../../utils/errorsHandlers';
import handleGetNewPostForm, {
  swaggerPaths as getNewPostFormPaths
} from './getNewPostForm';
import handlePostNewForm, {
  swaggerPaths as postNewPostPaths
} from './postNewPost';
import handlePutEditPost, {
  swaggerPaths as putEditPostPaths
} from './putEditPost';
import handleGetHidePost, {
  swaggerPaths as getHidePostPaths
} from './getHidePost';

export const swaggerPaths = {
  '/posts/new': {
    get: getNewPostFormPaths,
    post: postNewPostPaths
  },
  '/posts/editPost': {
    put: putEditPostPaths
  },
  '/posts/hide': {
    get: getHidePostPaths
  }
};

const router = Router();

router.get('/new', handle(handleGetNewPostForm));
router.post('/new', handle(handlePostNewForm));
router.put('/editPost', handle(handlePutEditPost));
router.get('/hide', handle(handleGetHidePost));

export default router;
