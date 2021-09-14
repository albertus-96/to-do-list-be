import http from 'http';
import url from 'url';
import * as controller from '../controller/todo.controllers';
import { IReqBody } from '../interfaces/Body';
import logRequest, { checkIfEmptyBody } from '../middleware/common';
import { validateCreate, validateUpdate } from '../middleware/todosValidator';
import response from '../utils/formatter';

export default async (req: http.IncomingMessage, res: http.ServerResponse) => {
	//id holder for a todo
	let id = '';
	//body holder for a todo
	let isNotEmptyBody: IReqBody;
	//check for valid input
	let isValidInput: boolean;
	//check for query search
	let sortAscending = url.parse(req.url!!, true).search;

	//logger
	logRequest(req);

	//routing for http server
	switch (true) {
		//get all todo
		case (req.url === '/todos' ||
			req.url === '/todos?sortAscending=false' ||
			req.url === '/todos?sortAscending=true') &&
			req.method === 'GET':
			req;
			controller.get(req, res, sortAscending?.split('=')[1]);
			break;

		//get todo by id
		case req.url && req.url.split('/').length == 3 && req.method === 'GET':
			//get id first
			id = req.url?.split('/')[2] ?? '';
			if (id?.match(/^[a-f\d]{24}$/i)) {
				//case valid id
				controller.getById(req, res, id);
			} else {
				response(res, id === '' ? 'No id detected' : 'Invalid id type', undefined, false, 400);
			}
			break;

		//post a new todo
		case req.url === '/todos' && req.method === 'POST':
			//check if empty body
			isNotEmptyBody = await checkIfEmptyBody(req, res);
			if (isNotEmptyBody.next) {
				//check if body have a valid input
				isValidInput = await validateCreate(req, res, isNotEmptyBody.body);
				if (isValidInput) {
					controller.create(req, res, isNotEmptyBody.body);
				}
			}
			break;

		//update a todo
		case req.url && req.url.split('/').length == 3 && req.method === 'PATCH':
			//get id first
			id = req.url?.split('/')[2] ?? '';
			if (id?.match(/^[a-f\d]{24}$/i)) {
				//case valid id, check contain body
				isNotEmptyBody = await checkIfEmptyBody(req, res);
				if (isNotEmptyBody.next) {
					//check if body have a valid input
					isValidInput = await validateUpdate(req, res, isNotEmptyBody.body);
					if (isValidInput) {
						controller.update(req, res, id, isNotEmptyBody.body);
					}
				}
			} else {
				response(res, id === '' ? 'No id detected' : 'Invalid id type', undefined, false, 400);
			}
			break;

		//delete todo by id
		case req.url && req.url.split('/').length == 3 && req.method === 'DELETE':
			//get id first
			id = req.url?.split('/')[2] ?? '';
			if (id?.match(/^[a-f\d]{24}$/i)) {
				//case valid id
				controller.deleteById(req, res, id);
			} else {
				response(res, id === '' ? 'No id detected' : 'Invalid id type', undefined, false, 400);
			}
			break;

		default:
			response(res, 'Path not found', undefined, false, 404);
			break;
	}
};
