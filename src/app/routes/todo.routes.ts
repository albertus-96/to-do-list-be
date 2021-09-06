import express from 'express';
import * as controller from '../controller/todo.controllers';
import { checkIfEmptyBody } from '../middleware/common';
import { validateCreate, validateUpdate } from '../middleware/todosValidator';

const router = express.Router();

export default (app: express.Application) => {
	//get all todo
	router.get('/', controller.get);

	//get a todo
	router.get('/:id', controller.getById);

	//post a new todo
	router.post('/', checkIfEmptyBody, validateCreate, controller.create);

	//update a todo
	router.patch('/:id', checkIfEmptyBody, validateUpdate, controller.update);

	//delete a todo
	router.delete('/:id', controller.deleteById);

	//define routes
	app.use('/todos', router);
};
