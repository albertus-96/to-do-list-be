import http from 'http';
import response from '../utils/formatter';

//validate body when create a new todo
const validateCreate = async (req: http.IncomingMessage, res: http.ServerResponse, body: Object): Promise<boolean> => {
	const bodies = Object.keys(body);
	const acceptedBody = ['desc', 'deadline'];
	if (bodies.every((body) => acceptedBody.includes(body)) && bodies.length == acceptedBody.length) {
		return true;
	} else {
		response(res, 'Request must have only desc(string) and deadline(date)', undefined, false, 400);
		return false;
	}
};

//validate body when update a todo
const validateUpdate = async (req: http.IncomingMessage, res: http.ServerResponse, body: Object): Promise<boolean> => {
	const bodies = Object.keys(body);
	const acceptedBody = ['desc', 'deadline', 'done'];
	if (
		(bodies.some((body) => acceptedBody.includes(body)) && bodies.length == 1) ||
		(bodies.some((body) => acceptedBody.includes(body)) && bodies.length < acceptedBody.length) ||
		(bodies.every((body) => acceptedBody.includes(body)) && bodies.length == acceptedBody.length)
	) {
		return true;
	} else {
		response(res, 'Request must have only desc(string), done(boolean), and deadline(date)', undefined, false, 400);
		return false;
	}
};

export { validateCreate, validateUpdate };
