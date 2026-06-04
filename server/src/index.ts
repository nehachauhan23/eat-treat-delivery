import { Server } from "socket.io";
import { app } from "./app.js";
import http from "http";
import { initializeSocket } from "./socket.js";

const PORT = 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
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
  
})

// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });
