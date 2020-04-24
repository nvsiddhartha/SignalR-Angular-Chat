import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Message } from 'src/models/message';
import { Text2 } from 'src/models/text';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  messageReceived = new EventEmitter<Message>();

  constructor() {
    this.buildConnection();
    this.startConnection();
  }

  public buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.baseUrl + 'chathub')
      .build();
  };

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        console.log('connection started');
        this.registerSignalEvents();
      })
      .catch(err => {
        console.log('Error while starting connection: ' + err);
        setTimeout(function () { this.startConnection; }, 3000);
      });
  };

  sendMessage(room: string, data: Text2) {
    return this.hubConnection.invoke("Message", room, data);
  }

  joinGroup(room: string, sender: string) {
    return this.hubConnection.invoke("JoinRoom", room, sender);
  }

  leaveRoom(room: string, sender: string) {
    return this.hubConnection.invoke("LeaveRoom", room, sender);
  }

  private registerSignalEvents() {
    this.hubConnection.on('JoinRoom', (data: Message) => {
      this.messageReceived.emit(data);
    });
    this.hubConnection.on('LeaveRoom', (data: Message) => {
      this.messageReceived.emit(data);
    });
    this.hubConnection.on('ChatMessage', (data: Message) => {
      this.messageReceived.emit(data);
    });
  }
}
