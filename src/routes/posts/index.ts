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
import handleDeletePost, {
  swaggerPaths as deletePostPaths
} from './deletePost';

export const swaggerPaths = {
  '/posts/new': {
    get: getNewPostFormPaths,
    post: postNewPostPaths
  },
  '/posts/editPost': {
    put: putEditPostPaths
  },
  '/posts/delete': {
    get: deletePostPaths
  }
};

const router = Router();

router.get('/new', handle(handleGetNewPostForm));
router.post('/new', handle(handlePostNewForm));
router.put('/editPost', handle(handlePutEditPost));
router.delete('/delete', handle(handleDeletePost));

export default router;
