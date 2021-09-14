//require/import section
require('dotenv').config('.env');
import http from 'http';
import handler from './routes/todo.routes';

const app = http.createServer(handler);

export default app;
