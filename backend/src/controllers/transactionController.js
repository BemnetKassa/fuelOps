import prisma from '../config/prisma.js';
import { getIo } from '../config/socket.js';


export const getTransactions = async (req, res, next) => {
try {
const txs = await prisma.fuelTransaction.findMany({ include: { user: true, station: true } });
res.json(txs);
} catch (err) {
next(err);
}
};


export const createTransaction = async (req, res, next) => {
try {
const { userId, stationId, liters } = req.body;


// Basic transaction: decrement station stock and create transaction
const station = await prisma.station.findUnique({ where: { id: stationId } });
if (!station) return res.status(404).json({ message: 'Station not found' });
if (station.currentStock < liters) return res.status(400).json({ message: 'Not enough fuel in station' });


const updatedStation = await prisma.station.update({ where: { id: stationId }, data: { currentStock: station.currentStock - Number(liters) } });


const tx = await prisma.fuelTransaction.create({ data: { userId, stationId, liters: Number(liters) } });


// emit update
try {
const io = getIo();
io.emit('stock_update', { stationId, currentStock: updatedStation.currentStock });
io.emit('new_transaction', { tx });
} catch (e) {
console.warn('Socket emit failed', e.message);
}


res.status(201).json(tx);
} catch (err) {
next(err);
}
};