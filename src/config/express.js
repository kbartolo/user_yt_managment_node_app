import express from 'express';
import userRouter from '#Routes/user.routes.js';

const expressApp = express();

// Middlewares
expressApp.use(express.json());

// Routers
expressApp.use('/user', userRouter);

export default expressApp;
