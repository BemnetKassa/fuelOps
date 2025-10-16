import http from 'http';
import app from './app.js';
import { initSocket } from './config/socket.js';


const PORT = process.env.PORT || 5000;


const server = http.createServer(app);
const io = initSocket(server);


server.listen(PORT, () => {
console.log(`✅ Server running on port ${PORT}`);
});


// FILE: src/routes/userRoutes.js
import express from 'express';
import { getAllUsers, createUser } from '../controllers/userController.js';


const router = express.Router();


router.get('/', getAllUsers);
router.post('/', createUser);


export default router;