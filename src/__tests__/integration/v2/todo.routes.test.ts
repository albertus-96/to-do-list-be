import request from 'supertest';
import { addNewTodo, updateTodo, wrongTodoId } from '../../fixtures/todo.fixture';
import setupTestDB from '../../utils/setupTestDb';
import app from '../../../app/index';
import { user } from '../../fixtures/user.fixture';

//agent
const agent = request.agent(app);

//start the db first
setupTestDB();

//constant
let token: string;
let todoId: string;

//token
beforeAll(async () => {
	const response = await agent.post('/api/v2/auth/register').send(user);
	token = response.body.data.token;
});

describe('Todos Routes V2', () => {
	describe('#GET api/v2/todos', () => {
		//negative test case
		it('should return error because there are no todos in database', async () => {
			const response = await agent.get('/api/v2/todos').set('Authorization', `bearer ${token}`);
			expect(response.statusCode).toBe(400);
			expect(response.body.message).toBe('Todos is Empty');
		});
	});

	describe('#POST api/v2/todos', () => {
		//negative test case
		it('should return fail message when add new todo without token', async () => {
			const response = await agent.post('/api/v2/todos').send(addNewTodo);
			expect(response.statusCode).toBe(400);
			expect(response.body.message).toContain('Error: No auth token');
		});

		//positive test case
		it('should return success message when add new todo', async () => {
			const response = await agent
				.post('/api/v2/todos')
				.set('Authorization', `bearer ${token}`)
				.field('desc', addNewTodo.desc)
				.field('deadline', addNewTodo.deadline)
				.attach('screenshot', addNewTodo.screenshot);
			expect(response.statusCode).toBe(200);
			expect(response.body.data.todo.desc).toBe(addNewTodo.desc);
			expect(response.body.data.todo.deadline).toBe(addNewTodo.deadline);
			todoId = response.body.data.todo._id;
		});
	});

	describe('#GET api/v2/todos', () => {
		//positive test case
		it('should return all todo', async () => {
			const response = await agent.get('/api/v2/todos').set('Authorization', `bearer ${token}`);
			expect(response.statusCode).toBe(200);
			expect(response.body.data.todos.length).toBeGreaterThan(0);
		});

		//positive test case
		it('should return all todo sorted descending', async () => {
			const response = await agent.get('/api/v2/todos?isAscending=false').set('Authorization', `bearer ${token}`);
			expect(response.statusCode).toBe(200);
			expect(response.body.data.todos.length).toBeGreaterThan(0);
		});

		//positive test case
		it('should return a todo with same posted todo', async () => {
			const response = await agent.get(`/api/v2/todos/${todoId}`).set('Authorization', `bearer ${token}`);
			expect(response.statusCode).toBe(200);
			expect(response.body.data.todo.desc).toBe(addNewTodo.desc);
			expect(response.body.data.todo.deadline).toBe(addNewTodo.deadline);
		});

		//negative test case
		it('should not return a todo because no todo with that id', async () => {
			const response = await agent.get(`/api/v2/todos/${wrongTodoId}`).set('Authorization', `bearer ${token}`);
			expect(response.statusCode).toBe(400);
			expect(response.body.message).toBe(`Can not find todo with id=${wrongTodoId}`);
		});
	});

	describe('#PATCH api/v2/todos', () => {
		//positive test case
		it('should patch a todo', async () => {
			const response = await agent
				.patch(`/api/v2/todos/${todoId}`)
				.set('Authorization', `bearer ${token}`)
				.field('desc', updateTodo.desc)
				.attach('screenshot', updateTodo.screenshot);
			expect(response.statusCode).toBe(200);
			expect(response.body.data.todo.desc).toBe(updateTodo.desc);
		});
	});

	describe('#DEL api/v2/todos', () => {
		//positive test case
		it('should delete a todo', async () => {
			const response = await agent.delete(`/api/v2/todos/${todoId}`).set('Authorization', `bearer ${token}`);
			expect(response.statusCode).toBe(200);
			expect(response.body.message).toBe(`Successfully delete todo with id=${todoId}`);
		});

		//negative test case
		it('should not delete a todo because todo does not exist', async () => {
			const response = await agent.delete(`/api/v2/todos/${wrongTodoId}`).set('Authorization', `bearer ${token}`);
			expect(response.statusCode).toBe(400);
			expect(response.body.message).toBe(`Can not found todo with id=${wrongTodoId}`);
		});
	});
});
