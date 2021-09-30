require('dotenv').config('.env');

/**
 * This is environment variable for all the app
 * @constant env contain environment variable (prod / dev / debug)
 * @constant port contain port environment variable for serving
 * @constant cors contain cors environment variable for handling cors
 * @constant dbURL contain dbURL environment variable for connecting to DB.
 * @constant signKey contain signKey environment variable for encrypting jwt
 * @constant imgDir contain imgDir environment variable for saving uploaded images
 */
export = {
	env: process.env.NODE_ENV,
	port: process.env.PORT || process.env.PORT_BACKUP,
	cors: process.env.CORS,
	dbUrl: process.env.DATABASE_URL || process.env.DATABASE_DEV_URL,
	signKey: process.env.SIGN_KEY,
	imgDir: process.env.IMG_DIR,
};
