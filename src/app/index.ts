//require/import section
require('dotenv').config('.env');
// require("./src/app/config/auth.config");
import express from 'express';
import cors from 'cors';
import { db } from './models/index';
import { ConnectOptions } from 'mongoose';
import formatResponse from './utils/formatter';
import logRequest from './middleware/logging';
import todoRouter from './routes/todo.routes';

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

// Connect to mongo DB
db.mongoose
	.connect(dbUrl, {
		// useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useFindAndModify: false,
	} as ConnectOptions)
	.then(() => {
		console.log(`Connected to the ${dbUrl}!`);
	})
	.catch((err) => {
		console.log('Cannot connect to the database! \n', err);
		process.exit();
	});

app.use(logRequest);

//include all routes
todoRouter(app);

app.use(function (req, res) {
	res.status(404).send(formatResponse('Path not found', undefined, false, 404));
});

export default app;
