import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { generateDocumentation } from './swagger';

require('dotenv').config();

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
  '/login': {
    get: getPaths
  }
};

const app = express();

const port = process.env.PORT || 3000;

const documentation = generateDocumentation(paths);

const router = Router();

app.use(router);

router.use('/', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(documentation));
router.get('/swagger', (_req, res) =>
  res.send(JSON.stringify(documentation, null, 2))
);

router.get('/login', (_req, res, _next) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
