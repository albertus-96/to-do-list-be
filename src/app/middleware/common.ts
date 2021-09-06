import express from 'express';
import formatResponse from '../utils/formatter';

// General logging for all API access
export default function logRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
	let date = new Date(Date.now()).toLocaleString().split(',');
	// Prints time, url, method
	console.log(`At: ${date[0]} ${date[1]} \n URL: ${req.baseUrl}${req.path} \n Method: ${req.method}`);
	next();
}

export function checkIfEmptyBody(req: express.Request, res: express.Response, next: express.NextFunction) {
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		return res.status(400).send(formatResponse('Request data can not be empty!', undefined, false, 400));
	} else {
		next();
	}
}
