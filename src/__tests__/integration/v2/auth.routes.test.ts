import request from 'supertest';
import { addNewTodo, updateTodo, wrongTodoId } from '../../fixtures/todo.fixture';
import setupTestDB from '../../utils/setupTestDb';
import app from '../../../app/index';
import { user, wrongUser } from '../../fixtures/user.fixture';

//agent
const agent = request.agent(app);

//start the db first
setupTestDB();

//constant
let token: string;

describe('Auth Routes V2', () => {
	describe('#POST api/v2/auth/register', () => {
		//positive test case
		it('should successfully register new user', async () => {
			const response = await agent.post('/api/v2/auth/register').send(user);
			expect(response.statusCode).toBe(201);
			expect(response.body.message).toBe('Successfully register the user');
			expect(response.body.data.token).toBeTruthy();
			token = response.body.data.token;
		});

		//negative test case
		it('should not register new user because wrong body', async () => {
			const response = await agent.post('/api/v2/auth/register').send(wrongUser);
			expect(response.statusCode).toBe(400);
			expect(response.body.message).toBe('"password" is required');
			expect(response.body.data.token).toBeFalsy();
		});
	});

	describe('#POST api/v2/auth/login', () => {
		//negative test case
		it('should return error because wrong body content', async () => {
			const response = await agent.post('/api/v2/auth/login').send(user);
			expect(response.statusCode).toBe(400);
			expect(response.body.message).toBe('"name" is not allowed');
		});

		//positive test case
		it('should successfully login user', async () => {
			const response = await agent.post('/api/v2/auth/login').send({ email: user.email, password: user.password });
			expect(response.statusCode).toBe(200);
			expect(response.body.data.token).toBeTruthy();
			token = response.body.data.token;
		});
	});

	describe('#POST api/v2/auth/logout', () => {
		//negative test case
		it('should return error because empty body', async () => {
			const response = await agent.post('/api/v2/auth/logout').send({});
			expect(response.statusCode).toBe(400);
			expect(response.body.message).toBe('"token" is required');
		});

		//positive test case
		it('should successfully logout user', async () => {
			const response = await agent.post('/api/v2/auth/logout').send({ token: token });
			expect(response.statusCode).toBe(204);
			expect(response.body.message).toBeFalsy();
		});
	});
});
