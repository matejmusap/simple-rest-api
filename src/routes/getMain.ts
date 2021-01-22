import { Request, Response, NextFunction } from 'express';

function hanldeGetMain(_req: Request, res: Response, _next: NextFunction) {
  res.render('main');
}

export default hanldeGetMain;
