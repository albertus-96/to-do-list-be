import config from '../../app/configs/config';

describe('Config Environment', () => {
	describe('#Environment Variable', () => {
		it('should return all the environment variable', () => {
			const expectedConfig = {
				env: 'test',
				port: '5000',
				cors: 'http://localhost:3002',
				dbUrl: 'mongodb://localhost:27017/todos',
				signKey: 'secretkeynooneknow',
				imgDir: 'uploads/images',
			};
			expect(config).toEqual(expectedConfig);
		});
	});
});
