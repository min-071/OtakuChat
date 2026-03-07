import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = (url: string): Socket => {
  if (!socket) {
    socket = io(url, {
      transports: ['websocket'],
      autoConnect: false,
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;
