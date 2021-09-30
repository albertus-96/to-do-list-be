import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { db } from '../models/index';
import config from './config';

const User = db.user;

//jwt options
const jwtOptions = {
	secretOrKey: config.signKey,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

//jwt verify method and step
const jwtVerify = async (token: any, done: any) => {
	User.findOne({ emailAddress: token.user.emailAddress })
		.then(async (user) => {
			if (user) {
				return done(null, user);
			} else {
				throw new Error('Cannot find user with that e-mail');
			}
		})
		.catch((error) => {
			return done(error);
		});
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

passport.use(jwtStrategy);
