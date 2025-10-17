import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import stationRoutes from './routes/stationRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import refillRoutes from './routes/refillRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';


dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.json({ message: 'FuelOps API is running' }));


app.use('/api/users', userRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/refills', refillRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reports', reportRoutes);
app.use(errorHandler);


export default app;