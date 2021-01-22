import { Request, Response, NextFunction } from 'express';

function handleGetRegister(_req: Request, res: Response, _next: NextFunction) {
  res.render('register');
}

export default handleGetRegister;
