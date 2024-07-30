const socket = io();

document.getElementById("enterChat").onclick = function () {
  const username = document.getElementById("username").value;
  if (username) {
    socket.emit("set username", username);
  }
};

socket.on("usuario registrado", (data) => {
  document.getElementById("usernameInput").style.display = "none";
  document.getElementById("chat").style.display = "block";
  console.log(`Usuario registrado: ${data.username} con IP: ${data.clientIp}`);
});

document.getElementById("sendMessage").onclick = function () {
  const messageInput = document.getElementById("m");
  socket.emit("mensaje chat", messageInput.value);
  messageInput.value = "";
  return false;
};

socket.on("mensaje chat", (data) => {
  const item = document.createElement("li");
  item.textContent = `${data.user.username} (${data.user.clientIp}): ${data.msg}`;
  document.getElementById("messages").appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
