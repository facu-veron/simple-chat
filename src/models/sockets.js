class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      // Escuchar el evento: mensaje desde el servidor
      socket.on("message-to-server", (data) => {
        console.log(data);
        this.io.emit("message-from-server", data);
      });
    });
  }
}

export default Sockets;
