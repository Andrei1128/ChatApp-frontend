import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private socket: Socket) {}

  send(sendTo: string, message: string) {
    this.socket.emit(sendTo, message);
  }
  public get(getFrom: string) {
    this.socket.on(getFrom, (message: string) => {
      this.message.next(message);
    });

    return this.message.asObservable();
  }
}
