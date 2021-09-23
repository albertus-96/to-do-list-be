import Joi from 'joi';
import { objectId, todoDeadline } from './custom.validations';

const createTodo = {
	body: Joi.object().keys({
		description: Joi.string().required(),
		deadline: Joi.date().required().custom(todoDeadline),
	}),
};

const getAllTodos = {
	query: Joi.object().keys({
		isAscending: Joi.boolean(),
	}),
};

const getTodoById = {
	params: Joi.object().keys({
		id: Joi.required().custom(objectId),
	}),
};

const updateTodo = {
	params: Joi.object().keys({
		id: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			description: Joi.string(),
			deadline: Joi.date().custom(todoDeadline),
			done: Joi.boolean(),
		})
		.min(1),
};

const deleteTodoById = {
	params: Joi.object().keys({
		id: Joi.required().custom(objectId),
	}),
};

export { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodoById };
