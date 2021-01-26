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
import handlePostCreateCollaboration, {
  swaggerPaths as postCreateCollaborationPaths
} from './postCreateCollaboration';
import handlePutAddAdmin, {
  swaggerPaths as putAddAdminPaths
} from './putAddAdmin';

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
  '/user/cretaCollaboration': {
    post: postCreateCollaborationPaths
  },
  '/user/addAdmin': {
    put: putAddAdminPaths
  }
};

const router = Router();

router.post('/register', handle(handlePostRegisterUser));
router.post('/login', handle(handlePostLoginUser));
router.post('/forgot', handle(handlePostForgotPassword));
router.post('/cretaCollaboration', handle(handlePostCreateCollaboration));
router.get('/home/:id', handle(handleGetUserHomepage));
router.get('/reset/:token', handle(handleGetResetPasswordPage));
router.put('/resetPassword', handle(handlePutResetPassword));
router.put('/addAdmin', handle(handlePutAddAdmin));

export default router;
