import { Router } from 'express';
import { handle } from '../../utils/errorsHandlers';
import handleGetNewPostForm, {
  swaggerPaths as getNewPostFormPaths
} from './getNewPostForm';
import handlePostNewForm, {
  swaggerPaths as postNewPostPaths
} from './postNewPost';
import handleGetHidePost, {
  swaggerPaths as getHidePostPaths
} from './getHidePost';
import handleDeletePost, {
  swaggerPaths as deletePostPaths
} from './deletePost';

export const swaggerPaths = {
  '/posts/new': {
    get: getNewPostFormPaths,
    post: postNewPostPaths
  },
  '/posts/hide': {
    get: getHidePostPaths
  },
  '/posts/delete/{postId}': {
    delete: deletePostPaths
  }
};

const router = Router();

router.get('/new', handle(handleGetNewPostForm));
router.post('/new', handle(handlePostNewForm));
router.get('/hide', handle(handleGetHidePost));
router.delete('/delete/:postId', handle(handleDeletePost));

export default router;
