import express from "express";
import Sockets from "./sockets.js";
import http from "http";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

import { Server } from "socket.io";
import cors from "cors";
class SocketServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    // http server
    this.server = http.createServer(this.app);
    // configuracion del socket server
    this.io = new Server(this.server, {
      /* Config */
    });
  }

  middlewares() {
    // Desplegar el directorio publico
    const __dirname = dirname(fileURLToPath(import.meta.url));
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    this.app.use(cors());
  }

  configureSoket() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar middlewares
    this.middlewares();
    // Inicializar Sockets
    this.configureSoket();

    // Inicializar server
    this.server.listen(this.port, () =>
      console.log(`Server listening on port ${this.port}`)
    );
  }
}

export default SocketServer;
