import express from 'express';
import { getRefills, addRefill } from '../controllers/refillController.js';


const router = express.Router();
router.get('/', getRefills);
router.post('/', addRefill);
export default router;