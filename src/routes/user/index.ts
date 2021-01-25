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
import handlePostResetPassword, {
  swaggerPaths as postResetPasswordPaths
} from './postResetPassword';
import handlePutAddCollaborator, {
  swaggerPaths as putAddCollaboratorPaths
} from './putAddCollaborator';

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
    post: postResetPasswordPaths
  },
  '/user/updateCollaborators': {
    put: putAddCollaboratorPaths
  }
};

const router = Router();

router.post('/register', handle(handlePostRegisterUser));
router.post('/login', handle(handlePostLoginUser));
router.post('/forgot', handle(handlePostForgotPassword));
router.post('/resetPassword', handle(handlePostResetPassword));
router.get('/home/:id', handle(handleGetUserHomepage));
router.get('/reset/:token', handle(handleGetResetPasswordPage));
router.put('/updateCollaborators', handle(handlePutAddCollaborator));

export default router;
