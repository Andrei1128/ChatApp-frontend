import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {}
  send(msg, to) {
    this.socket.emit('private', { msg: msg, to: to });
  }
  get() {
    this.socket.on('private', (data) => {
      return data;
    });
  }
}
