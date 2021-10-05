import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Spin up an actual/real MongoDB server programmatically from node, for testing
let mongoServer: MongoMemoryServer;

// Provide connection to a new in-memory database server.
const connect = async () => {
	mongoServer = await MongoMemoryServer.create();
	/* Prevent MongooseError: Can't call `openUri()` on
   an active connection with different connection strings */
	await mongoose.disconnect();

	const mongoUri = mongoServer.getUri();
	mongoose.connect(mongoUri, (err) => {
		if (err) {
			console.error(err);
		}
	});
};

// Remove and close the database and server.
const close = async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
};

// Remove all data from collections.
const clear = async () => {
	const collections = mongoose.connection.collections;

	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany({});
	}
};

export { connect, close, clear };
