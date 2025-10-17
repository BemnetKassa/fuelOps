import prisma from '../config/prisma.js';
import { getIo } from '../config/socket.js';


export const getRefills = async (req, res, next) => {
try {
const refills = await prisma.fuelRefill.findMany({ include: { station: true } });
res.json(refills);
} catch (err) {
next(err);
}
};


export const addRefill = async (req, res, next) => {
try {
const { stationId, litersAdded, source } = req.body;


const station = await prisma.station.update({
where: { id: stationId },
data: { currentStock: { increment: Number(litersAdded) } }
});


const refill = await prisma.fuelRefill.create({
data: { stationId, litersAdded: Number(litersAdded), source: source || 'manual' }
});


const io = getIo();
io.emit('refill_update', { stationId, currentStock: station.currentStock });


res.status(201).json(refill);
} catch (err) {
next(err);
}
};