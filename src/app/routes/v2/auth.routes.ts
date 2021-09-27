import express from 'express';
import { validate } from '../../middlewares/validate';
import * as controller from '../../controllers/auth.controllers';
import * as schema from '../../validations/auth.validations';

const router = express.Router();

//route '/'
router
	//for register user
	.post('/register', validate(schema.register), controller.register)
	//for login user
	.post('/login', validate(schema.login), controller.login)
	//for logout user
	.post('/logout', validate(schema.logout), controller.logout);

export default router;
