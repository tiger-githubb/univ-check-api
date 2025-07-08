import { Server, Socket } from "socket.io";
import { User } from "../entity/User.entity";

export enum EventEnum {
  CONNECTION = 'connection',
  MESSAGE = 'message',
  DISCONNECT = 'disconnect',
  USER_CONNECTION = 'user_connection',
  EMARGEMENT = 'emargement',
  EMARGEMENT_STATUS_CHANGE = 'emargement_status_change'
}

export class SocketGateway {
  private io: Server;
  private userClients: Record<string, string> = {};

  constructor(io: Server) {
    this.io = io;
    this.initListeners();
  }

  private initListeners() {
    this.io.on(EventEnum.CONNECTION, (socket: Socket) => {
      console.log("Client connecté :", socket.id);

      socket.on(EventEnum.USER_CONNECTION, (userId: string) => {
        this.userClients[userId] = socket.id;
        console.log(`Socket ${socket.id} enregistré pour l'utilisateur ${userId}`);
        socket.emit(EventEnum.USER_CONNECTION, "USER CONNECTED !");

      });

      socket.on(EventEnum.MESSAGE, (data) => {
        console.log("Message reçu :", data);
        socket.emit(EventEnum.MESSAGE, "Message bien reçu !");
      });

      socket.on(EventEnum.DISCONNECT, () => {
        console.log("Client déconnecté :", socket.id);
      });
    });
  }

  // Emettre un événement à tous les clients
  broadcast(event: string, data: any) {
    this.io.emit(event, data);
  }

  // Notifier tous les utilisateurs
  onEmargement(users: User[], event: EventEnum, data: any) {
    users.map((user) => {
      const socketId = this.userClients[user.id];
      if (socketId) {
        // console.log('SOCKET ============= EMARGEMENT ', event, data);
        this.io.to(socketId).emit(event, data);
      }
    })
  }
}
