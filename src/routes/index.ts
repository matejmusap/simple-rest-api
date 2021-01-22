import { Router } from 'express';
import { handle } from '../utils/handlers';
import swaggerUi from 'swagger-ui-express';
import { generateDocumentation } from '../swagger';
import hanldeGetLogin from './getLogin';
import hanldeGetMain from './getMain';
import handleGetRegister from './getRegister';

const router = Router();

const getPaths = {
  summary: 'Get',
  produces: ['application/json'],
  responses: {
    200: { description: 'OK' },
    400: { description: 'Bad request.' },
    404: { description: 'Requested resource not found' },
    500: { description: 'Internal server error' }
  }
};

const paths = {
  '/': {
    get: getPaths
  },
  '/login': {
    get: getPaths
  },
  '/register': {
    get: getPaths
  },
  '/forgot': {
    get: getPaths
  }
};

const documentation = generateDocumentation(paths);

router.use('/', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(documentation));

router.get(
  '/swagger',
  handle((_req, res) => res.send(JSON.stringify(documentation, null, 2)))
);

router.get('/', handle(hanldeGetMain));

router.get('/login', handle(hanldeGetLogin));

router.get('/register', handle(handleGetRegister));

router.get(
  '/forgot',
  handle((_req, res, _next) => {
    res.render('forgot');
  })
);

export default router;
