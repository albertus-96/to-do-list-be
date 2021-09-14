import http from 'http';
import response from '../utils/formatter';
import Todos from '../models/todo.models';
import { ITodo, ITodoDb, ITodoUpdate } from '../interfaces/Todo';

//get all todo
const get = async (req: http.IncomingMessage, res: http.ServerResponse, sortAscending: string = 'true') => {
	try {
		const todos = (await Todos.find()) as ITodoDb[];
		if (todos) {
			//case todos exist
			response(
				res,
				'Successfully retrieve todos',
				{
					todos:
						sortAscending === 'true'
							? todos.sort((a, b) => {
									return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
							  })
							: todos.sort((a, b) => {
									return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
							  }),
				},
				true,
				200
			);
		} else {
			//case todo empty
			response(res, 'There are no todos', undefined, true, 200);
		}
	} catch (error: unknown) {
		response(res, String(error) ?? 'Unknown error happen', undefined, false, 500);
	}
};

//get a todo by id
const getById = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
	try {
		const todo = await Todos.findById(id);
		if (todo) {
			//case todo exist
			response(res, 'Successfully retrieve todo', { todo: todo }, true, 200);
		} else {
			//case todo empty
			response(res, `Cannot find todo with id=${id}`, undefined, true, 200);
		}
	} catch (error) {
		response(res, String(error) ?? 'Unknown error happen', undefined, false, 500);
	}
};

//create new todo
const create = async (req: http.IncomingMessage, res: http.ServerResponse, body: Object) => {
	try {
		const reqBody: ITodo = body as ITodo;
		const deadline = new Date(reqBody.deadline);
		//check if valid date
		if (deadline instanceof Date && !isNaN(deadline.getTime())) {
			//check if date already expired
			if (deadline > new Date()) {
				if (typeof reqBody.desc === 'string') {
					//create new todo
					const newTodo = await Todos.create(reqBody);
					response(res, 'Successfully create a new todo', { todo: newTodo }, true, 201);
				} else {
					response(res, 'Description is not a string', undefined, false, 400);
				}
			} else {
				response(res, 'Deadline already expired', undefined, false, 400);
			}
		} else {
			response(res, 'Date is not a valid date', undefined, false, 400);
		}
	} catch (error) {
		response(res, String(error) ?? 'Unknown error happen', undefined, false, 500);
	}
};

//update a todo by id
const update = async (req: http.IncomingMessage, res: http.ServerResponse, id: string, body: Object) => {
	try {
		const reqBody: ITodoUpdate = body as ITodoUpdate;
		const deadline = reqBody.deadline ? new Date(reqBody.deadline) : null;
		let validDate = false;
		let validBoolean = false;
		let validString = false;

		//check valid deadline first
		if (deadline && deadline instanceof Date && !isNaN(deadline.getTime())) {
			if (deadline > new Date()) {
				validDate = true;
			} else {
				response(res, 'Deadline already expired', undefined, false, 400);
			}
		} else if (!deadline) {
			validDate = true;
		} else {
			response(res, 'Date is not a valid date', undefined, false, 400);
		}

		//check valid boolean
		if (typeof reqBody.done === 'boolean') {
			validBoolean = true;
		} else if (!reqBody.done) {
			validBoolean = true;
		} else {
			response(res, 'Done is not a valid boolean', undefined, false, 400);
		}

		//check valid boolean
		if (typeof reqBody.desc === 'string') {
			validString = true;
		} else if (!reqBody.desc) {
			validString = true;
		} else {
			response(res, 'Description is not a valid string', undefined, false, 400);
		}

		//continue update data
		if (validDate && validBoolean && validString) {
			//update a todo
			const todo = (await Todos.findById(id)) as ITodoDb;
			if (todo) {
				//case todo exist
				const updatedTodo: ITodoDb = {
					...todo,
					desc: reqBody.desc ?? todo.desc,
					deadline: reqBody.deadline ?? todo.deadline,
					done: reqBody.done ?? todo.done,
					updatedAt: new Date().toISOString(),
				};
				const result = await Todos.update(id, updatedTodo);
				response(res, `Successfully update todo with id=${id}`, { todo: result }, true, 200);
			} else {
				//case todo empty
				response(res, `Cannot find todo with id=${id}`, undefined, true, 200);
			}
		}
	} catch (error) {
		response(res, String(error) ?? 'Unknown error happen', undefined, false, 500);
	}
};

//delete a todo by id
const deleteById = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
	try {
		const todo = await Todos.findById(id);
		if (todo) {
			//case todo exist
			await Todos.removeById(id);
			response(res, `Successfully delete todo with id=${id}`, undefined, true, 200);
		} else {
			//case todo empty
			response(res, `Cannot find todo with id=${id}`, undefined, true, 200);
		}
	} catch (error) {
		response(res, String(error) ?? 'Unknown error happen', undefined, false, 500);
	}
};

// TODO: delete todos by user id

export { get, getById, create, update, deleteById };
