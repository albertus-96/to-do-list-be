import express from 'express';
import formatResponse from '../utils/formatter';
import * as todoService from '../services/todos.services';
import { ApiError } from '../interfaces/Error';
import httpStatus from 'http-status';
import asyncWrapper from '../utils/asyncWrapper';

//get all todo
const get = asyncWrapper(async (req: express.Request, res: express.Response) => {
	//get query if available
	const userId = req.query.userId;

	//search condition
	let condition = userId ? { userId: userId } : {};

	//sorting
	let isAscending = req.query.isAscending ? (req.query.isAscending === 'false' ? false : true) : true;

	//get all todo
	await todoService.getAllTodo(condition, isAscending).then((todos) => {
		//case Todo empty
		if (todos.length === 0) {
			throw new ApiError(httpStatus.OK, 'Todos is Empty');
		} else {
			return res.send(
				formatResponse(userId ? 'Successfully retrieve todos from user' : 'Successfully retrieve todos', {
					todos: todos,
				})
			);
		}
	});
});

//get a todo by id
const getById = asyncWrapper(async (req: express.Request, res: express.Response) => {
	//get todo id
	const id = req.params.id;

	//get a todo by id
	await todoService.getTodoById(id).then((todo) => {
		//case not found
		if (todo) {
			res.send(formatResponse(`Successfully retrieve todo`, { todo: todo }));
		} else {
			throw new ApiError(httpStatus.NOT_FOUND, `Can not find todo with id=${id}`);
		}
	});
});

//create new todo
const create = asyncWrapper(async (req: express.Request, res: express.Response) => {
	//get all inputted data
	const newTodo = {
		desc: req.body.desc,
		deadline: req.body.deadline,
	};

	//save new todo
	await todoService.createTodo(newTodo).then((todo) => {
		res.send(formatResponse(`Successfully create a new todo`, { todo: todo }));
	});
});

//update a todo by id
const update = asyncWrapper(async (req: express.Request, res: express.Response) => {
	//get todo id & validator
	const id = req.params.id;

	//proceed data if valid input
	await todoService.updateTodoById(id, req.body).then((todo) => {
		res.send(formatResponse(`Successfully update todo with id=${id}`, { todo: todo }));
	});
});

//delete a todo by id
const deleteById = asyncWrapper(async (req: express.Request, res: express.Response) => {
	//get todo id
	const id = req.params.id;

	//proceed delete todo
	await todoService.deleteTodoById(id).then((result) => {
		if (result) {
			res.send(formatResponse(`Successfully delete todo with id=${id}`, undefined));
		} else {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Can not found todo with id=${id}');
		}
	});
});

// TODO: delete todos by user id

export { get, getById, create, update, deleteById };
