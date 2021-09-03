import express from 'express';
import { db } from '../models/index';
import formatResponse from '../utils/formatter';

//get todo db
const Todo = db.todo;

//get all todo
const get = async (req: express.Request, res: express.Response) => {
	//get query if available
	const userId = req.query.userId;

	//search condition
	let condition = userId ? { userId: userId } : {};

	//get all user
	await Todo.find(condition)
		.then((todos) => {
			//case Todo empty
			if (todos.length === 0) {
				return res.status(200).send(formatResponse('There is no todos'));
			} else {
				return res.status(200).send(
					formatResponse(userId ? 'Successfully retrieve todos from user' : 'Successfully retrieve todos', {
						todos: todos,
					})
				);
			}
		})
		.catch((err) => {
			res.status(500).send(formatResponse(err.message ?? 'Unknown error happen', undefined, false, 500));
		});
};

export { get };
