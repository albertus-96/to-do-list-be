import express from 'express';

// General logging for all API access
export default function logRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
	let date = new Date(Date.now()).toLocaleString().split(',');
	// Prints time, url, method
	console.log(`At: ${date[0]} ${date[1]} \n URL: ${req.baseUrl}${req.path} \n Method: ${req.method}`);
	next();
}
