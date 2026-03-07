import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});

// Middleware
app.use(express.json());

// TODO: Add routes (e.g., /api/rooms, /api/messages)

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // example event
  socket.on('joinRoom', (roomId: string) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
