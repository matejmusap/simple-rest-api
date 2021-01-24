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
import handlePostForgotPassword, {
  swaggerPaths as postForgotPassword
} from './postForgotPassword';
import handleGetResetPasswordPage, {
  swaggerPaths as getResetPasswordPage
} from './getForgotPasswordPage';
import handlePostResetPassword, {
  swaggerPaths as postResetPassword
} from './postResetPassword';

export const swaggerPaths = {
  '/user/register': {
    post: postRegisterUserPaths
  },
  '/user/login': {
    post: postLoginUserPaths
  },
  '/user/home/{id}': {
    get: getUserHomepagePaths
  },
  '/user/forgot': {
    get: postForgotPassword
  },
  '/user/reset/{token}': {
    get: getResetPasswordPage
  },
  '/user/resetPassword': {
    post: postResetPassword
  }
};

const router = Router();

router.post('/register', handle(handlePostRegisterUser));
router.post('/login', handle(handlePostLoginUser));
router.post('/forgot', handle(handlePostForgotPassword));
router.post('/resetPassword', handle(handlePostResetPassword));
router.get('/home/:id', handle(handleGetUserHomepage));
router.get('/reset/:token', handle(handleGetResetPasswordPage));

export default router;
