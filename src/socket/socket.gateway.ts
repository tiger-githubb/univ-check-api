import { Server, Socket } from "socket.io";

export class SocketGateway {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.initListeners();
  }

  private initListeners() {
    this.io.on("connection", (socket: Socket) => {
      console.log("Client connecté :", socket.id);

      socket.on("message", (data) => {
        console.log("Message reçu :", data);
        socket.emit("message", "Message bien reçu !");
      });

      socket.on("disconnect", () => {
        console.log("Client déconnecté :", socket.id);
      });
    });
  }

  // Exemple de méthode pour émettre un événement à tous les clients
  public broadcast(event: string, data: any) {
    this.io.emit(event, data);
  }
}
