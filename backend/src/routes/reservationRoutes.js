import express from 'express';
import { createReservation, getReservations, updateReservationStatus } from '../controllers/reservationController.js';


const router = express.Router();
router.get('/', getReservations);
router.post('/', createReservation);
router.put('/:id/status', updateReservationStatus);
export default router;