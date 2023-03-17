import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private socket: Socket) {}

  send(message: string) {
    this.socket.emit('chat message', message);
  }
  public get = () => {
    this.socket.on('chat message', (message: string) => {
      this.message.next(message);
    });

    return this.message.asObservable();
  };
}
