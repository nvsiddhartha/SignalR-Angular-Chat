import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SignalRService } from 'src/services/signalR.service';
import { Message } from 'src/models/message';
import { Text2 } from 'src/models/text';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  room: string = 'Test';
  message: string = '';
  messages: Message[] = [];
  sender: string = new Date().getTime().toString();

  constructor(private chatService: SignalRService) { }

  ngOnDestroy() { this.subscription.unsubscribe(); }

  join() { this.chatService.joinGroup(this.room, this.sender); }

  leave() { this.chatService.leaveRoom(this.room, this.sender); }

  send() {
    let text: Text2 = { content: this.message, sender: this.sender };
    this.chatService.sendMessage(this.room, text)
      .then(() => {
        this.message = '';
      });
  }

  ngOnInit() {
    this.subscription = this.chatService.messageReceived.subscribe((data: Message) => {
      if (data.user == this.sender) {
        data.isSent = true;
      }
      this.messages.push(data);
    });
  }
}
