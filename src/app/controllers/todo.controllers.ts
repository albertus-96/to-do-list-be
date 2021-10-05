import express from 'express';
import formatResponse from '../utils/formatter';
import * as todoService from '../services/todos.services';
import { ApiError } from '../interfaces/Error';
import httpStatus from 'http-status';
import asyncWrapper from '../utils/asyncWrapper';
import { getImgURL } from '../utils/getUrl';
import { ITodo } from '../interfaces/Todo';
import { removeFromStorage, uploadFile } from '../services/files.services';
import config from '../configs/config';

//get all todo
const get = asyncWrapper(async (req: express.Request, res: express.Response) => {
	//get query if available
	const userId = res.locals.userId;

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
			//remap to return url image to FE
			todos.map((todo: ITodo) => {
				if (todo.screenshot?.name) {
					todo.screenshot.url = getImgURL(req, todo.screenshot?.name);
				}
			});
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
			if (todo.screenshot?.name) {
				todo.screenshot.url = getImgURL(req, todo.screenshot?.name);
			}
			res.send(formatResponse(`Successfully retrieve todo`, { todo: todo }));
		} else {
			throw new ApiError(httpStatus.NOT_FOUND, `Can not find todo with id=${id}`);
		}
	});
});

//create new todo
const create = asyncWrapper(async (req: express.Request, res: express.Response) => {
	//get all inputted data
	let newTodo: ITodo = {
		userId: res.locals.userId,
		desc: req.body.desc,
		deadline: req.body.deadline,
	};

	//if screenshot file exist, save it
	if (req.files?.screenshot) {
		const savedImage = uploadFile(req.files?.screenshot);
		newTodo.screenshot = {
			name: savedImage,
			url: getImgURL(req, savedImage),
		};
	}

	//save new todo
	await todoService.createTodo(newTodo).then((todo) => {
		res.send(formatResponse(`Successfully create a new todo`, { todo: todo }));
	});
});

//update a todo by id
const update = asyncWrapper(async (req: express.Request, res: express.Response) => {
	//get todo id & validator
	const id = req.params.id;

	//if screenshot file exist
	if (req.files?.screenshot) {
		await todoService.getTodoById(id).then((res) => {
			//delete previous screenshot
			if (res?.screenshot?.name) {
				removeFromStorage(`public/${config.imgDir}/${res?.screenshot?.name}`);
			}
			//save new screenshot
			const savedImage = uploadFile(req.files?.screenshot);
			req.body.screenshot = {
				name: savedImage,
				url: getImgURL(req, savedImage),
			};
		});
	}

	//proceed data if valid input
	await todoService.updateTodoById(id, req.body).then((todo) => {
		res.send(formatResponse(`Successfully update todo with id=${id}`, { todo: todo }));
	});
});

//delete a todo by id
const deleteById = asyncWrapper(async (req: express.Request, res: express.Response) => {
	//get todo id
	const id = req.params.id;

	//delete screenshot file related to it.
	await todoService.getTodoById(id).then((res) => {
		if (res?.screenshot?.name) {
			removeFromStorage(`public/${config.imgDir}/${res?.screenshot?.name}`);
		}
	});

	//proceed delete todo
	await todoService.deleteTodoById(id).then((result) => {
		if (result) {
			res.send(formatResponse(`Successfully delete todo with id=${id}`, undefined));
		} else {
			throw new ApiError(httpStatus.BAD_REQUEST, `Can not found todo with id=${id}`);
		}
	});
});

// TODO: delete todos by user id

export { get, getById, create, update, deleteById };
