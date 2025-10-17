import express from 'express';
import { getSystemReport } from '../controllers/reportController.js';


const router = express.Router();
router.get('/', getSystemReport);
export default router;