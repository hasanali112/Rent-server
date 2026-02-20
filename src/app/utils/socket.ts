import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

let io: SocketServer;

const init = (httpServer: HttpServer) => {
  io = new SocketServer(httpServer, {
    cors: {
      origin: '*', // In production, restrict this to your frontend URL
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', socket => {
    console.log(`\n[Socket] New client connected: ${socket.id}`);

    // Join room based on user ID for targeted notifications
    socket.on('join', (userId: string) => {
      socket.join(userId);
      console.log(`[Socket] User ${userId} joined their private room.`);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io is not initialized!');
  }
  return io;
};

const emitNotification = (userId: string, event: string, data: any) => {
  if (io) {
    io.to(userId).emit(event, data);
    console.log(`[Socket] Emitted ${event} to user ${userId}`);
  }
};

export const SocketUtils = {
  init,
  getIO,
  emitNotification,
};
