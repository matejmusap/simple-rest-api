import bodyParser from 'body-parser';
import express from 'express';
import methodOverride from 'method-override';
import cookie from 'cookie-parser';
import { error404, error500 } from './utils/errorsHandlers';
import router from './routes';
import { jwtHandlerLogin, jwtHandlerResetPassword } from './utils/jwtHandlers';
import pgInitClient from './models';

require('dotenv').config();

pgInitClient();

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookie());

app.use('/', router);
app.use(jwtHandlerLogin);
app.use(jwtHandlerResetPassword);
app.use(error404);
app.use(error500);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
