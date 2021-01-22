import { Request, Response, NextFunction } from 'express';

function hanldeGetLogin(_req: Request, res: Response, _next: NextFunction) {
  res.render('login');
}

export default hanldeGetLogin;
