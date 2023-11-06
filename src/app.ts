// Import the required modules
import express, { Application } from 'express';
import taskRouter from './tasks/task.pod.router';
import morgan from 'morgan';

// Create a new Express application
const app: Application = express();

// Use Morgan middleware if in development mode
if (process.env.NODE_ENV === 'development') {
     app.use(morgan('dev'));
};

// Parse incoming requests with JSON and URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount the user router at the /api/user endpoint
app.use('/api/task', taskRouter);


export default app;