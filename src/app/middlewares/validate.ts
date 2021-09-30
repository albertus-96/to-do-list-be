import express from 'express';
import path from 'path';
import httpStatus from 'http-status';
import Joi from 'joi';
import { ApiError } from '../interfaces/Error';
import formatResponse from '../utils/formatter';
import { pick } from '../utils/objectPicker';
import fileUpload from 'express-fileupload';

const validate = (schema: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const validSchema = pick(schema, ['params', 'query', 'body']);
	const object = pick(req, Object.keys(validSchema));
	const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: 'key' }, abortEarly: false })
		.validate(object);

	if (error) {
		const errorMessage = error.details.map((details) => details.message).join(', ');
		return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
	}
	Object.assign(req, value);
	return next();
};

const validateFileType = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	//allowed extension for file type
	const allowedExt = ['.jpg', '.jpeg', '.png'];
	const image = req.files?.screenshot;

	if (image) {
		if (allowedExt.includes(path.extname(Array.isArray(image) ? image[0].name : image.name))) {
			next();
		} else {
			res
				.status(httpStatus.BAD_REQUEST)
				.send(formatResponse('Only .jpg, .jpeg, .png accepted as image', undefined, false, httpStatus.BAD_REQUEST));
		}
	} else {
		next();
	}
};

export { validate, validateFileType };
