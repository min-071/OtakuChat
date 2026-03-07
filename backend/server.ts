import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { verifyFirebaseToken, AuthenticatedRequest } from './utils/verifyFirebaseToken';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/users/me', verifyFirebaseToken, (req: AuthenticatedRequest, res) => {
  res.json({
    uid: req.user?.uid,
    email: req.user?.email,
    name: req.user?.name || null,
  });
});

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
