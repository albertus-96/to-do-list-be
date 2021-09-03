import express from 'express';
import * as controller from '../controller/todo.controllers';

const router = express.Router();

export default (app: express.Application) => {
	//get all todo
	router.get('/', controller.get);

	//define routes
	app.use('/todos', router);
};
