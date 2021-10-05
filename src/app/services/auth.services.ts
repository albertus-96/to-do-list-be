import httpStatus from 'http-status';
import { ApiError } from '../interfaces/Error';
import * as userServices from './user.services';
import * as tokenServices from './token.services';

const loginUserWithEmail = async (email: string, password: string) => {
	const user: any = await userServices.getUserByEmail(email);
	if (!user || !(await user.isPasswordMatch(password))) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
	}
	return user;
};

const logout = async (token: string) => {
	return await tokenServices.blacklistToken(token);
};

export { loginUserWithEmail, logout };
