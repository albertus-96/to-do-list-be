//import json
import path from 'path';
import todos from '../data/todos.json';
import { customAlphabet } from 'nanoid';
import { writeDataToFile } from '../utils/common';
import { ITodo, ITodoDb } from '../interfaces/Todo';

//random id generator
const id = customAlphabet('1234567890abcdef', 24);

//model for get all todos
function find() {
	return new Promise((resolve) => {
		resolve(todos);
	});
}

//model for create new todos
function create(todo: ITodo): Promise<ITodoDb | unknown> {
	return new Promise(async (resolve, reject) => {
		//create new todo object
		const newTodo: ITodoDb = {
			_id: id(),
			desc: todo.desc,
			deadline: todo.deadline,
			done: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		//push new todo to current todos
		todos.push(newTodo);
		try {
			//write to file
			await writeDataToFile(path.resolve(__dirname, '../data/todos.json'), todos);
			resolve(newTodo);
		} catch (error) {
			reject(error);
		}
	});
}

//model for get a todo by ID.
function findById(id: string): Promise<ITodoDb | unknown> {
	return new Promise((resolve) => {
		const todo = todos.find((data) => data._id === id);
		resolve(todo);
	});
}

//model for update a todo by ID
function update(id: string, updatedTodo: ITodoDb): Promise<ITodoDb | unknown> {
	return new Promise(async (resolve, reject) => {
		const index = todos.findIndex((todo) => todo._id === id);
		todos[index] = updatedTodo;
		try {
			await writeDataToFile(path.resolve(__dirname, '../data/todos.json'), todos);
			resolve(todos[index]);
		} catch (error) {
			reject(error);
		}
	});
}

//model for delete a todo by ID
function removeById(id: string) {
	return new Promise(async (resolve, reject) => {
		try {
			const filteredTodos = todos.filter((todo) => todo._id !== id);
			const result = await writeDataToFile(path.resolve(__dirname, '../data/todos.json'), filteredTodos);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
}

export = { find, create, findById, update, removeById };
