require('dotenv').config('.env');

export = {
	env: process.env.NODE_ENV,
	port: process.env.PORT || process.env.PORT_BACKUP,
	cors: process.env.CORS,
	dbUrl: process.env.DATABASE_URL || process.env.DATABASE_DEV_URL,
	signKey: process.env.SIGN_KEY,
};
