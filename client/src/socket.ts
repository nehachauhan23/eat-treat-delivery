import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.DEV
  ? import.meta.env.VITE_SOCKET_URL_DEV
  : import.meta.env.VITE_SOCKET_URL_PROD;
export const socket = io(SOCKET_URL);
