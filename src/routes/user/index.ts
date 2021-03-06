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
  swaggerPaths as postForgotPasswordPaths
} from './postForgotPassword';
import handleGetResetPasswordPage, {
  swaggerPaths as getResetPasswordPagePaths
} from './getForgotPasswordPage';
import handlePutResetPassword, {
  swaggerPaths as putResetPasswordPaths
} from './putResetPassword';
import handlePutAddAdmin, {
  swaggerPaths as putAddAdminPaths
} from './putAddAdmin';
import handleGetUserNewsfeed, {
  swaggerPaths as getUserNewsfeedPaths
} from './getUserNewsfeed';
import handlePutBlockUser, {
  swaggerPaths as putBlockUserPaths
} from './putBlockUser';
import handleGetUserLogut, {
  swaggerPaths as getUserLogoutPaths
} from './getUserLogout';

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
    get: postForgotPasswordPaths
  },
  '/user/reset/{token}': {
    get: getResetPasswordPagePaths
  },
  '/user/resetPassword': {
    put: putResetPasswordPaths
  },
  '/user/addAdmin': {
    put: putAddAdminPaths
  },
  '/user/newsfeed/{id}': {
    get: getUserNewsfeedPaths
  },
  '/user/blockUser': {
    put: putBlockUserPaths
  },
  '/user/logout': {
    get: getUserLogoutPaths
  }
};

const router = Router();

router.post('/register', handle(handlePostRegisterUser));
router.post('/login', handle(handlePostLoginUser));
router.post('/forgot', handle(handlePostForgotPassword));
router.get('/home/:id', handle(handleGetUserHomepage));
router.get('/reset/:token', handle(handleGetResetPasswordPage));
router.get('/newsfeed/:id', handle(handleGetUserNewsfeed));
router.get('/logout', handle(handleGetUserLogut));
router.put('/resetPassword', handle(handlePutResetPassword));
router.put('/addAdmin', handle(handlePutAddAdmin));
router.put('/blockUser', handle(handlePutBlockUser));

export default router;
