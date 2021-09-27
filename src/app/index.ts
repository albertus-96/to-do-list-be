//require/import section
require('dotenv').config('.env');
import './configs/auth.config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { db } from './models/index';
import { ConnectOptions } from 'mongoose';
import formatResponse from './utils/formatter';
import routesV1 from './routes/v1/index';
import routesV2 from './routes/v2/index';
import logger from './configs/logger';
import { errorConverter, errorHandler } from './middlewares/error';

//const variable
const app = express();
// const { formatResponse } = require("./src/app/utils/formatter");
const dbUrl = process.env.DATABASE_URL || 'no db';

//port for handling cors
let corsOptions = {
	origin: process.env.CORS,
};

// Cors setup for app
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// jwt authentication
app.use(passport.initialize());

// Connect to mongo DB
db.mongoose
	.connect(dbUrl, {
		// useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useFindAndModify: false,
	} as ConnectOptions)
	.then(() => {
		logger.info(`Connected to the ${dbUrl}!`);
	})
	.catch((err) => {
		logger.error('Cannot connect to the database! \n', err);
		process.exit();
	});

//include all routes
app.use('/api/v1', routesV1);
app.use('/api/v2', routesV2);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.use(function (req, res) {
	res.status(404).send(formatResponse('Path not found', undefined, false, 404));
});

export default app;
