import 'reflect-metadata';
import { createServer } from 'http';
import dotenv  from 'dotenv';
import app from './app';
import { AppDataSource } from './tasks/databaseConfig';

// Load environment variables from .env file
dotenv.config()

// Create HTTP server instance using the Express app
const server = createServer(app);

// Get the port number from environment variables
const port = process.env.PORT as number | unknown;

// Define a function to start the server
const startServer = async () => {

    try {
        
       // Configure the ORM (e.g. TypeOrm)
        AppDataSource

         // Start the server and listen on the specified port
        server.listen(port, () => {
            console.table(`start server with port : ${port}`)
        })

    } catch (err) {
        console.error('Error starting the server', err);
        // Handle SIGKILL signal to gracefully shut down the server
        try {
            process.on('SIGKILL', () => {
                server.close(() => {
                    console.log('Server closed.');
                    process.exit(0);
                });
            });
        } catch (err) {
            console.error('Error closing the server:', err);
            process.exit(1);
        };
    };
};

startServer();




