// todo DB
import { Mongoose, Schema } from 'mongoose';
import { IUser } from '../interfaces/User';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			max: 140,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			max: 140,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// encrypt password before save
userSchema.pre('save', async function (next) {
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// Password Validation
userSchema.methods.isPasswordMatch = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.statics.isEmailTaken = async function (email: string) {
	const user = await this.findOne({ email: email });
	return !!user;
};

export default (mongoose: Mongoose) => {
	const user = mongoose.model<IUser>('user', userSchema);
	return user;
};
