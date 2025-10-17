import prisma from '../config/prisma.js';
import { getIo } from '../config/socket.js';


export const getReservations = async (req, res, next) => {
try {
const reservations = await prisma.reservation.findMany({ include: { user: true, station: true } });
res.json(reservations);
} catch (err) {
next(err);
}
};


export const createReservation = async (req, res, next) => {
try {
const { userId, stationId, litersReserved } = req.body;
const reservation = await prisma.reservation.create({
data: { userId, stationId, litersReserved: Number(litersReserved), status: 'pending' }
});


const io = getIo();
io.emit('new_reservation', reservation);


res.status(201).json(reservation);
} catch (err) {
next(err);
}
};


export const updateReservationStatus = async (req, res, next) => {
try {
const { id } = req.params;
const { status } = req.body;


const reservation = await prisma.reservation.update({ where: { id }, data: { status } });


const io = getIo();
io.emit('reservation_update', reservation);


res.json(reservation);
} catch (err) {
next(err);
}
};