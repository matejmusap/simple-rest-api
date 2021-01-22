import express, { Request, Response, NextFunction } from 'express';

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response, _next: NextFunction): void => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
