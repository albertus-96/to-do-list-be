import { ApiError } from '../interfaces/Error';
import express from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import config from '../configs/config';
import logger from '../configs/logger';
import formatResponse from '../utils/formatter';

//convert error to standard error
const errorConverter = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	let error = err;
	if (!(error instanceof ApiError)) {
		const statusCode =
			error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
		const message = error.message || httpStatus[statusCode];
		error = new ApiError(statusCode, message, false, err.stack);
	}
	next(error);
};

//handle every error on API
const errorHandler = (err: ApiError, req: express.Request, res: express.Response, next: express.NextFunction) => {
	let { statusCode, message } = err;
	if (config.env === 'production' && !err.isOperational) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		message = String(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
	}

	res.locals.errorMessage = err.message;

	const response = formatResponse(message, undefined, false, statusCode);

	if (config.env === 'development') {
		logger.error(err);
	}

	res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
