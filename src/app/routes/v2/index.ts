import express from 'express';
import todoRoute from './todo.routes';
import authRoute from './auth.routes';
import { logRequest } from '../../middlewares/logger';

const router = express.Router();

const defaultRoutes = [
	{
		path: '/auth',
		route: authRoute,
	},
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
