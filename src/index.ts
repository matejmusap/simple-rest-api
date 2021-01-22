import bodyParser from 'body-parser';
import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import sequelize from './utils/sequelize';
import { generateDocumentation } from './swagger';
import { error404, error500, handle } from './utils/handlers';

require('dotenv').config();

(async () => await sequelize.sync({ logging: false }))();

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

const app = express();

const port = process.env.PORT || 3000;

const documentation = generateDocumentation(paths);

const router = Router();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use(error404);
app.use(error500);

router.use('/', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(documentation));
router.get('/swagger', (_req, res) =>
  res.send(JSON.stringify(documentation, null, 2))
);

router.get(
  '/',
  handle((_req, res, _next) => {
    res.redirect('main!');
  })
);

router.get(
  '/login',
  handle((_req, res, _next) => {
    res.render('login');
  })
);

router.get(
  '/register',
  handle((_req, res, _next) => {
    res.render('register');
  })
);

router.get(
  '/forgot',
  handle((_req, res, _next) => {
    res.render('forgot');
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
