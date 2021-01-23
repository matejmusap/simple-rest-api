import { Router } from 'express';
import { handle } from '../utils/handlers';
import swaggerUi from 'swagger-ui-express';
import { generateDocumentation } from '../swagger';
import hanldeGetMain, { swaggerPaths as getMainPaths } from './getMain';
import hanldeGetLogin, { swaggerPaths as getLoginPaths } from './getLogin';
import handleGetRegister, {
  swaggerPaths as getRegisterPaths
} from './getRegister';
import handleGetForgot, { swaggerPaths as getForgotPaths } from './getRegister';
import handlePostRegisterUser, {
  swaggerPaths as postRegisterUserPaths
} from './postRegisterUser';

const paths = {
  '/': {
    get: getMainPaths
  },
  '/user/login': {
    get: getLoginPaths
  },
  '/user/register': {
    get: getRegisterPaths
  },
  '/user/forgot': {
    get: getForgotPaths
  },
  '/user': {
    post: postRegisterUserPaths
  }
};

const router = Router();

const documentation = generateDocumentation(paths);

router.use('/', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(documentation));
router.get('/swagger', (_req: any, res: any) => {
  return res.send(JSON.stringify(documentation, null, 2));
});

router.get('/', handle(hanldeGetMain));
router.post('/user', handle(handlePostRegisterUser));
router.get('/user/login', handle(hanldeGetLogin));
router.get('/user/register', handle(handleGetRegister));
router.get('/user/forgot', handle(handleGetForgot));

export default router;
