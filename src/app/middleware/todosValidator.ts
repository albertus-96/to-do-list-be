import express from 'express';
import formatResponse from '../utils/formatter';

//validate body when create a new todo
const validateCreate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const bodies = Object.keys(req.body);
	const acceptedBody = ['desc', 'deadline'];
	if (bodies.every((body) => acceptedBody.includes(body)) && bodies.length == acceptedBody.length) {
		next();
	} else {
		return res
			.status(400)
			.send(formatResponse(`Request must have only desc(string) and deadline(date)`, undefined, false, 400));
	}
};

//validate body when update a todo
const validateUpdate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const bodies = Object.keys(req.body);
	const acceptedBody = ['desc', 'deadline', 'done'];
	if (
		(bodies.some((body) => acceptedBody.includes(body)) && bodies.length == 1) ||
		(bodies.some((body) => acceptedBody.includes(body)) && bodies.length < acceptedBody.length) ||
		(bodies.every((body) => acceptedBody.includes(body)) && bodies.length == acceptedBody.length)
	) {
		next();
	} else {
		return res
			.status(400)
			.send(
				formatResponse(`Invalid request body, request body can only contain desc/deadline/done`, undefined, false, 400)
			);
	}
};

export { validateCreate, validateUpdate };
