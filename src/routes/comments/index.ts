import { Router } from 'express';
import { handle } from '../../utils/errorsHandlers';
import handlePostComment, { swaggerPaths as postComment } from './postComment';

export const swaggerPaths = {
  '/comment/new': {
    post: postComment
  }
};

const router = Router();

router.post('/new', handle(handlePostComment));

export default router;
