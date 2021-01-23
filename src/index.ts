import bodyParser from 'body-parser';
import express from 'express';
import sequilazeInit from './models';
import { error404, error500 } from './utils/handlers';
import router from './routes';

require('dotenv').config();

sequilazeInit();

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);
app.use(error404);
app.use(error500);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
