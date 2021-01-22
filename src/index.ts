import express, { Router } from 'express';
import { DataTypes, Model, Sequelize } from 'sequelize';
import swaggerUi from 'swagger-ui-express';
import { generateDocumentation } from './swagger';

require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'test',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || ''
});

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    paranoid: true,
    modelName: 'user'
  }
);

sequelize.sync({ logging: false });

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
