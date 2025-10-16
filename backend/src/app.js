import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import userRoutes from './routes/userRoutes.js';
import stationRoutes from './routes/stationRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';


import { errorHandler } from './middleware/errorHandler.js';


dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.json({ message: 'FuelOps API is running' }));


app.use('/api/users', userRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/transactions', transactionRoutes);


app.use(errorHandler);


export default app;