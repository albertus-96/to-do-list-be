import mongoose from 'mongoose';
import Todo from '../models/todo.models';
import User from '../models/user.models';
import Token from '../models/token.models';
import config from '../configs/config';

//set mongoose promise
mongoose.Promise = global.Promise;

//set global DB
export const db = {
	mongoose: mongoose,
	url: config.dbUrl,
	todo: Todo(mongoose),
	user: User(mongoose),
	token: Token(mongoose),
};
