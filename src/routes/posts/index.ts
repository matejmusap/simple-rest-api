import { Router } from 'express';
import { handle } from '../../utils/errorsHandlers';
import handleGetNewPostForm, {
  swaggerPaths as getNewPostFormPaths
} from './getNewPostForm';
import handlePostNewForm, {
  swaggerPaths as postNewPostPaths
} from './postNewPost';

export const swaggerPaths = {
  '/posts/new': {
    get: getNewPostFormPaths,
    post: postNewPostPaths
  }
};

const router = Router();

router.get('/new', handle(handleGetNewPostForm));
router.post('/new', handle(handlePostNewForm));

export default router;
