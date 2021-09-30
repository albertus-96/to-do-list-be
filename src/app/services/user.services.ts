import { db } from '../models/index';

//get user db
const User = db.user;

//register a new user
const createUser = async (newUser: any) => {
	return await User.create(newUser);
};

//get a user by email
const getUserByEmail = async (email: string) => {
	return await User.findOne({ email });
};

export { createUser, getUserByEmail };
