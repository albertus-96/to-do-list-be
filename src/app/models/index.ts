import mongoose from 'mongoose';
import Todo from '../models/todo.models';

//set mongoose promise
mongoose.Promise = global.Promise;

//set global DB
export const db = { mongoose: mongoose, url: process.env.DATABASE_URL, todo: Todo(mongoose) };
