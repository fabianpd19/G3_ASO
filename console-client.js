const io = require("socket.io-client");
const readline = require("readline");

// Configura el readline para la entrada de consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = io("http://localhost:3000");

// Solicita el nombre de usuario
rl.question("Ingresa tu nombre: ", (username) => {
  socket.emit("set username", username);

  // Cuando el usuario esté configurado, comienza a leer mensajes
  socket.on("usuario registrado", () => {
    console.log("Conectado al chat como " + username);

    // Lee los mensajes de la consola y envíalos al servidor
    rl.on("line", (input) => {
      socket.emit("mensaje chat", input);
    });
  });

  // Muestra los mensajes del chat
  socket.on("mensaje chat", (data) => {
    console.log(`${data.user.username} (${data.user.clientIp}): ${data.msg}`);
  });
});
