import { Server } from "socket.io";

export let io: Server;

export function initializeSocket(socketServer: Server) {
  io = socketServer;
}
