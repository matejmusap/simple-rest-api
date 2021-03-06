import { Router } from 'express';
import { handle } from '../utils/errorsHandlers';
import swaggerUi from 'swagger-ui-express';
import { generateDocumentation } from '../swagger';
import hanldeGetMain, { swaggerPaths as getMainPaths } from './getMain';
import hanldeGetLogin, { swaggerPaths as getLoginPaths } from './getLogin';
import handleGetRegister, {
  swaggerPaths as getRegisterPaths
} from './getRegister';
import handleGetForgot, { swaggerPaths as getForgotPaths } from './getForgot';
import user, { swaggerPaths as userPaths } from './user';
import posts, { swaggerPaths as postsPaths } from './posts';
import comments, { swaggerPaths as commentsPaths } from './comments';
import collaborators, {
  swaggerPaths as collaborationsPaths
} from './collaborators';
import postHistory, { swaggerPaths as postHistoryPaths } from './postHistory';

const paths = {
  '/': {
    get: getMainPaths
  },
  '/login': {
    get: getLoginPaths
  },
  '/register': {
    get: getRegisterPaths
  },
  '/forgot': {
    get: getForgotPaths
  },
  ...userPaths,
  ...postsPaths,
  ...commentsPaths,
  ...collaborationsPaths,
  ...postHistoryPaths
};

const router = Router();

router.use('/user', user);
router.use('/posts', posts);
router.use('/comments', comments);
router.use('/collaborators', collaborators);
router.use('/postHistory', postHistory);

const documentation = generateDocumentation(paths);

router.use('/', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(documentation));
router.get('/swagger', (_req: any, res: any) => {
  return res.send(JSON.stringify(documentation, null, 2));
});

router.get('/', handle(hanldeGetMain));
router.get('/login', handle(hanldeGetLogin));
router.get('/register', handle(handleGetRegister));
router.get('/forgot', handle(handleGetForgot));

export default router;
