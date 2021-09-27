import mongoose from 'mongoose';
import Todo from '../models/todo.models';
import User from '../models/user.models';
import Token from '../models/token.models';

//set mongoose promise
mongoose.Promise = global.Promise;

//set global DB
export const db = {
	mongoose: mongoose,
	url: process.env.DATABASE_URL,
	todo: Todo(mongoose),
	user: User(mongoose),
	token: Token(mongoose),
};
