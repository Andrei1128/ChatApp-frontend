import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private socket: Socket) {}

  connect(nickname: string) {
    this.socket.ioSocket.auth = { nickname };
    this.socket.ioSocket.connect();
  }

  send(sendTo: string, message: string) {
    this.socket.emit('chat', message);
  }
  get(getFrom: string) {
    this.socket.on('chat', (message: string) => {
      this.message.next(message);
    });

    return this.message.asObservable();
  }
}
