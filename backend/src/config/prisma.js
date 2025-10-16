import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;


// FILE: src/config/socket.js
import { Server } from 'socket.io';


let io;
export const initSocket = (server) => {
io = new Server(server, {
cors: {
origin: '*',
methods: ['GET', 'POST']
}
});


io.on('connection', (socket) => {
console.log('Socket connected:', socket.id);


socket.on('disconnect', () => {
console.log('Socket disconnected:', socket.id);
});
});


return io;
};


export const getIo = () => {
if (!io) throw new Error('Socket.io not initialized');
return io;
};