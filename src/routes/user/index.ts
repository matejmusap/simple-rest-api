import { Router } from 'express';
import { handle } from '../../utils/errorsHandlers';
import handlePostRegisterUser, {
  swaggerPaths as postRegisterUserPaths
} from './postRegisterUser';
import handlePostLoginUser, {
  swaggerPaths as postLoginUserPaths
} from './postLoginUser';
import handleGetUserHomepage, {
  swaggerPaths as getUserHomepagePaths
} from './getUserHomepage';

export const swaggerPaths = {
  '/user/register': {
    post: postRegisterUserPaths
  },
  '/user/login': {
    post: postLoginUserPaths
  },
  '/user/home/{id}': {
    get: getUserHomepagePaths
  }
};

const router = Router();

router.post('/register', handle(handlePostRegisterUser));
router.post('/login', handle(handlePostLoginUser));
router.get('/home/:id', handle(handleGetUserHomepage));

export default router;
