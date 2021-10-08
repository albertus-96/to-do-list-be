import request from 'supertest';
import app from '../../app/index';
import setupTestDB from '../utils/setupTestDb';

//agent
const agent = request.agent(app);

//start the db first
setupTestDB();

//constant
let token: string;

describe('Unknown Routes ', () => {
	describe('#GET access unknown routes', () => {
		//positive test case
		it('should return error message path not found', async () => {
			const response = await agent.post('/api/v2/unknown');
			expect(response.statusCode).toBe(404);
			expect(response.body.message).toBe('Path not found');
		});
	});
});
