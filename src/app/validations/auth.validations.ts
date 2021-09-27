import Joi from 'joi';
import { password } from './custom.validations';

const register = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required().custom(password),
	}),
};

const login = {
	body: Joi.object().keys({
		email: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

const logout = {
	body: Joi.object().keys({
		token: Joi.string().required(),
	}),
};

export { register, login, logout };
