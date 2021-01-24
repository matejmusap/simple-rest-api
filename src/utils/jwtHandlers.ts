import { Request, Response, NextFunction } from 'express';

function jwtHandlerLogin(req: Request, res: Response, next: NextFunction) {
  if ('/user/login' !== req.path && !req.cookies.hasOwnProperty('my-token')) {
    return res.redirect('/login');
  } else if (
    '/user/login' === req.path &&
    req.cookies.hasOwnProperty('my-token')
  ) {
    return res.redirect(`/user/home/${req.cookies['userId']}`);
  }

  next();
}

function jwtHandlerResetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    '/user/resetPassword' !== req.path &&
    !req.cookies.hasOwnProperty('my-token')
  ) {
    return res.redirect('/');
  } else if (
    '/user/resetPassword' === req.path &&
    req.cookies.hasOwnProperty('my-token')
  ) {
    return res.render(`resetPasswordPage`);
  }

  next();
}

export { jwtHandlerLogin, jwtHandlerResetPassword };
