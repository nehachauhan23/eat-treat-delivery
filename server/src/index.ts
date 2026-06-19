import { Server } from "socket.io";
import { app } from "./app.js";
import http from "http";
import { initializeSocket } from "./socket.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = 5000;

const isProd = process.env.NODE_ENV === "production";
console.log("isprod : ", isProd);

const CLIENT_URL = isProd
  ? process.env.CLIENT_URL_PROD
  : process.env.CLIENT_URL_DEV;

console.log(" CLient url : ", CLIENT_URL);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
  },
});

initializeSocket(io);

io.on("connection", (socket) => {
  console.log("socket successful");
  socket.on("joinOrder", (orderId: string) => {
    socket.join(orderId);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});