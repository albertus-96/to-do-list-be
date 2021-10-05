import * as db from './db';

const setupTestDB = () => {
	beforeAll(async () => {
		await db.connect();
	});

	afterAll(async () => {
		await db.close();
	});
};

export default setupTestDB;
