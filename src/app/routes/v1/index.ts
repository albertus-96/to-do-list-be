import express from 'express';
import { logRequest } from '../../middlewares/logger';
import todoRoute from './todo.routes';

const router = express.Router();

const defaultRoutes = [
	{
		path: '/todos',
		route: todoRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

router.all('*', logRequest);

export default router;
