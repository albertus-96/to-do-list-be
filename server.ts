//import env variable
require('dotenv').config('.env');
import app from './src/app/index';
import config from './src/app/configs/config';
import logger from './src/app/configs/logger';

//start server
let server = app.listen(config.port, () => {
	logger.info(`Server is running on port ${config.port}.`);
});

//handler when server exist
const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info('Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

//handler server crash
const unexpectedErrorHandler = (error: unknown) => {
	logger.error(error);
	exitHandler();
};

//caught crash error
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
	logger.info('SIGTERM received');
	if (server) {
		server.close();
	}
});

export default app;
