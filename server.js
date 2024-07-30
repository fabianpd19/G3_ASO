const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

let users = {};

io.on("connection", (socket) => {
  const clientIp = socket.handshake.address;
  console.log(`Un usuario se ha conectado desde la IP: ${clientIp}`);

  socket.on("set username", (username) => {
    users[socket.id] = { username, clientIp };
    socket.emit("usuario registrado", { username, clientIp });
  });

  socket.on("mensaje chat", (msg) => {
    const user = users[socket.id];
    io.emit("mensaje chat", { user, msg });
  });

  socket.on("disconnect", () => {
    console.log("Un usuario se ha desconectado");
    delete users[socket.id];
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
