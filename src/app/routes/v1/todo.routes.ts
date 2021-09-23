import express from 'express';
import * as controller from '../../controllers/todo.controllers';
import * as schema from '../../validations/todo.validations';
import { validate } from '../../middlewares/validate';

const router = express.Router();

//route '/'
router
	.route('/')
	//for get all todo
	.get(validate(schema.getAllTodos), controller.get)
	//for post a new todo
	.post(validate(schema.createTodo), controller.create);

//route ':/id'
router
	.route('/:id')
	//for get a todo
	.get(validate(schema.getTodoById), controller.getById)
	//for update a todo
	.patch(validate(schema.updateTodo), controller.update)
	//for delete a todo
	.delete(validate(schema.deleteTodoById), controller.deleteById);

export default router;
