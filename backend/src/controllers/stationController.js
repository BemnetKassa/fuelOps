import prisma from '../config/prisma.js';
import { getIo } from '../config/socket.js';


export const getStations = async (req, res, next) => {
try {
const stations = await prisma.station.findMany();
res.json(stations);
} catch (err) {
next(err);
}
};


export const createStation = async (req, res, next) => {
try {
const { name, location, fuelCapacity, currentStock } = req.body;
const station = await prisma.station.create({
data: { name, location, fuelCapacity: Number(fuelCapacity || 0), currentStock: Number(currentStock || 0) }
});
res.status(201).json(station);
} catch (err) {
next(err);
}
};


export const refillStation = async (req, res, next) => {
try {
const { id } = req.params;
const { litersAdded, source } = req.body;


const station = await prisma.station.update({
where: { id },
data: { currentStock: { increment: Number(litersAdded) } }
});


// log refill
await prisma.fuelRefill.create({ data: { stationId: id, litersAdded: Number(litersAdded), source: source || 'manual' } });


// emit socket event
try {
const io = getIo();
io.emit('stock_update', { stationId: id, currentStock: station.currentStock });
} catch (socketErr) {
console.warn('Socket emit failed:', socketErr.message);
}


res.json(station);
} catch (err) {
next(err);
}
};