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

	//sorting
	let isAscending = req.query.isAscending ? (req.query.isAscending === 'false' ? false : true) : true;

	//get all todos
	await Todo.find(condition)
		.sort(isAscending ? 'deadline' : '-deadline')
		.then((todos) => {
			//case Todo empty
			if (todos.length === 0) {
				return res.send(formatResponse('There is no todos'));
			} else {
				return res.send(
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

//get a todo by id
const getById = async (req: express.Request, res: express.Response) => {
	//get todo id
	const id = req.params.id;

	//get a todo by id
	await Todo.findOne({ _id: id })
		.then((todo) => {
			//case not found
			if (todo) {
				res.send(formatResponse(`Successfully retrieve todo`, { todo: todo }));
			} else {
				res.status(404).send(formatResponse(`Can not find todo with id=${id}`, undefined, false, 404));
			}
		})
		.catch((err) => {
			res.status(500).send(formatResponse(err.message ?? 'Unknown error happen', undefined, false, 500));
		});
};

//create new todo
const create = async (req: express.Request, res: express.Response) => {
	//get all inputted data
	const newTodo = new Todo({
		desc: req.body.desc,
		deadline: req.body.deadline,
	});

	//save new todo
	await newTodo
		.save()
		.then((todo) => {
			res.send(formatResponse(`Successfully create a new todo`, { todo: todo }));
		})
		.catch((err) => {
			res.status(500).send(formatResponse(err.message ?? 'Unknown error happen', undefined, false, 500));
		});
};

//update a todo by id
const update = async (req: express.Request, res: express.Response) => {
	//get todo id
	const id = req.params.id;

	Todo.findByIdAndUpdate(id, req.body, {
		new: true,
	})
		.then((todo) => {
			res.send(formatResponse(`Successfully update todo with id=${id}`, { todo: todo }));
		})
		.catch((err) => {
			res.status(500).send(formatResponse(err.message ?? 'Unknown error happen', undefined, false, 500));
		});
};

//delete a todo by id
const deleteById = async (req: express.Request, res: express.Response) => {
	//get todo id
	const id = req.params.id;

	Todo.findByIdAndRemove(id)
		.then((result) => {
			if (result) {
				res.send(formatResponse(`Successfully delete todo with id=${id}`, undefined));
			} else {
				res.status(404).send(formatResponse(`Can not find todo with id=${id}`, undefined, false, 404));
			}
		})
		.catch((err) => {
			res.status(500).send(formatResponse(err.message ?? 'Unknown error happen', undefined, false, 500));
		});
};

// TODO: delete todos by user id

export { get, getById, create, update, deleteById };
