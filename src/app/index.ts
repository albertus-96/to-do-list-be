//require/import section
require('dotenv').config('.env');
import './configs/auth.config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import { db } from './models/index';
import { ConnectOptions } from 'mongoose';
import formatResponse from './utils/formatter';
import routesV1 from './routes/v1/index';
import routesV2 from './routes/v2/index';
import logger from './configs/logger';
import { errorConverter, errorHandler } from './middlewares/error';
import { checkUploadDir } from './services/files.services';
import config from './configs/config';

//const variable
const app = express();
// const { formatResponse } = require("./src/app/utils/formatter");
const dbUrl = config.dbUrl || 'no db';

//port for handling cors
let corsOptions = {
	origin: config.cors,
};

// Cors setup for app
app.use(cors(corsOptions));

//for serving image
app.use(express.static('public'));

// Parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//for uploading image
app.use(fileUpload({ createParentPath: false, limits: { fileSize: 2 * 1024 * 1024 }, abortOnLimit: true }));

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
app.use('/v1/api', routesV1);
app.use('/v2/api', routesV2);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.use(function (req, res) {
	res.status(404).send(formatResponse('Path not found', undefined, false, 404));
});

checkUploadDir();

export default app;
