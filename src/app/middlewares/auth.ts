import express from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import { ApiError } from '../interfaces/Error';
import { db } from '../models/index';

const Token = db.token;

//middleware to make sure user have token before access API
const authMiddleware = () => {
	return function (req: express.Request, res: express.Response, next: express.NextFunction) {
		const token = req.headers.authorization?.replace('Bearer ', '');
		Token.findOne({ token: token }).then((result: any) => {
			if (result) {
				return next(new ApiError(httpStatus.FORBIDDEN, 'Invalid token, token already expired.'));
			} else {
				passport.authenticate('jwt', function (err: Error, user: any, info: any) {
					if (!user || err || info) {
						return next(new ApiError(httpStatus.BAD_REQUEST, String(err || info)));
					} else {
						res.locals.userId = user.id;
						next();
					}
				})(req, res, next);
			}
		});
	};
};

export { authMiddleware };
