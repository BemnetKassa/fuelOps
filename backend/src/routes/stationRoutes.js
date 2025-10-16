import express from 'express';
import { getStations, createStation, refillStation } from '../controllers/stationController.js';


const router = express.Router();


router.get('/', getStations);
router.post('/', createStation);
router.post('/:id/refill', refillStation);


export default router;