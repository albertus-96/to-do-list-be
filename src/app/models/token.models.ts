// todo DB
import { Mongoose } from 'mongoose';
import { IToken } from '../interfaces/Token';

export default (mongoose: Mongoose) => {
	const token = mongoose.model<IToken>(
		'token',
		new mongoose.Schema(
			{
				token: {
					type: String,
					required: true,
				},
			},
			{ timestamps: true }
		)
	);
	return token;
};
