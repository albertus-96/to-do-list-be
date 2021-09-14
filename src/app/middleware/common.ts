import http from 'http';
import { IReqBody } from '../interfaces/Body';
import { getBody } from '../utils/common';
import response from '../utils/formatter';

// General logging for all API access
export default function logRequest(req: http.IncomingMessage) {
	let date = new Date(Date.now()).toLocaleString().split(',');
	// Prints time, url, method
	console.log(`At: ${date[0]} ${date[1]} \n URL: ${req.url} \n Method: ${req.method}`);
}

export async function checkIfEmptyBody(req: http.IncomingMessage, res: http.ServerResponse): Promise<IReqBody> {
	const body: Object = await getBody(req);
	if (body.constructor === Object && Object.keys(body).length === 0) {
		response(res, 'Request data can not be empty!', undefined, false, 400);
		return { next: false, body: body };
	} else {
		return { next: true, body: body };
	}
}
