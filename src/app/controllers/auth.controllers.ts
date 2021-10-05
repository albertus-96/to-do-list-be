import express from 'express';
import asyncWrapper from '../utils/asyncWrapper';
import * as authServices from '../services/auth.services';
import * as tokenServices from '../services/token.services';
import * as userServices from '../services/user.services';
import httpStatus from 'http-status';
import formatResponse from '../utils/formatter';

const register = asyncWrapper(async (req: express.Request, res: express.Response) => {
	await userServices.createUser(req.body).then(async (user) => {
		const token = await tokenServices.generateToken({ name: user.name, email: user.email, id: user._id }, undefined);
		res
			.status(httpStatus.CREATED)
			.send(formatResponse('Successfully register the user', { token: token, userId: user._id }));
	});
});

const login = asyncWrapper(async (req: express.Request, res: express.Response) => {
	const { email, password } = req.body;
	await authServices.loginUserWithEmail(email, password).then(async (user) => {
		if (user) {
			const token = await tokenServices.generateToken({ name: user.name, email: user.email, id: user._id }, undefined);
			res.send(formatResponse('Successfully login', { token: token }));
		}
	});
});

const logout = asyncWrapper(async (req: express.Request, res: express.Response) => {
	await authServices.logout(req.body.token);
	res.status(httpStatus.NO_CONTENT).send();
});

export { register, login, logout };
