// todo DB
import { Mongoose } from 'mongoose';
import { ITodo } from '../interfaces/Todo';

export default (mongoose: Mongoose) => {
	const todo = mongoose.model<ITodo>(
		'todo',
		new mongoose.Schema(
			{
				userId: {
					type: mongoose.Types.ObjectId,
					required: false,
				},
				desc: {
					type: String,
					required: true,
				},
				deadline: {
					type: Date,
					required: true,
				},
				done: {
					type: Boolean,
					required: false,
					default: false,
				},
			},
			{ timestamps: true }
		)
	);
	return todo;
};
