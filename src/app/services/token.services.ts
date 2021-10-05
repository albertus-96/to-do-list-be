import config from '../configs/config';
import jwt from 'jsonwebtoken';
import { db } from '../models/index';

//blacklist token DB
const Token = db.token;

//generate new token
const generateToken = async (user: any, secret: string = config.signKey) => {
	const payload = {
		user: user,
	};
	return await jwt.sign(payload, secret, {
		expiresIn: '1d',
	});
};

//add token to blacklist
const blacklistToken = async (token: string) => {
	return await Token.create({ token: token });
};

export { generateToken, blacklistToken };
