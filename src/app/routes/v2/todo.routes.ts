import express from 'express';
import * as controller from '../../controllers/todo.controllers';
import * as schema from '../../validations/todo.validations';
import { validate, validateFileType } from '../../middlewares/validate';
import { authMiddleware } from '../../middlewares/auth';

const router = express.Router();

//route '/'
router
	.route('/')
	//for get all todo
	.get(authMiddleware(), validate(schema.getAllTodos), controller.get)
	//for post a new todo
	.post(authMiddleware(), validate(schema.createTodo), validateFileType, controller.create);

//route ':/id'
router
	.route('/:id')
	//for get a todo
	.get(authMiddleware(), validate(schema.getTodoById), controller.getById)
	//for update a todo
	.patch(authMiddleware(), validate(schema.updateTodo), validateFileType, controller.update)
	//for delete a todo
	.delete(authMiddleware(), validate(schema.deleteTodoById), controller.deleteById);

export default router;
