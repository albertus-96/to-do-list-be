import express from 'express';
import logger from '../configs/logger';

// General logging for all API access
export const logRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	let date = new Date().toLocaleDateString('en-US', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
	});
	// Prints time, url, method
	logger.info(`At: ${date[0]} ${date[1]} \n URL: ${req.baseUrl}${req.path} \n Method: ${req.method}`);
	next();
};
