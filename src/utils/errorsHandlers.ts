import { NextFunction, Request, Response } from 'express';

const handle = (
  fn: (req: Request, res: Response, next: NextFunction) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return Promise.resolve(fn(req, res, next));
    } catch (next) {
      return next(next);
    }
  };
};

function error404(req: Request, res: Response, _next: NextFunction) {
  console.log(`404 Requested resource not found: ${req.path}`);
  res.status(404).json('Not Found');
}

function error500(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);
  res.status(500).json(`Internal Server Error: ${err.message}`);
}

function badRequest(
  req: Request,
  res: Response,
  message: Object = 'Bad Request'
) {
  console.log(`400 Bad Request (${req.path}): ${message}`);
  res.send(message);
}

export { handle, error404, error500, badRequest };
