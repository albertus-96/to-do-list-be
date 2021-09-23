import { db } from '../models/index';

//get todo db
const Todo = db.todo;

//get all todo in database
const getAllTodo = async (query: Object, isAscending: boolean = true) => {
	const Todos = await Todo.find(query).sort(isAscending ? 'deadline' : '-deadline');
	return Todos;
};

//get a todo by id
const getTodoById = async (id: string) => {
	return await Todo.findById(id);
};

//create a new todo
const createTodo = async (newTodo: { desc: string; deadline: Date }) => {
	return await Todo.create(newTodo);
};

//update a todo by id
const updateTodoById = async (id: string, updateData: {}) => {
	return await Todo.findByIdAndUpdate(id, updateData, {
		new: true,
	});
};

//delete a todo by id
const deleteTodoById = async (id: string) => {
	return await Todo.findByIdAndRemove(id);
};

export { getAllTodo, getTodoById, createTodo, updateTodoById, deleteTodoById };
