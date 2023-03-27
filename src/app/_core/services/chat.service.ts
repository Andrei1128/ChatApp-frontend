import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message: BehaviorSubject<any> = new BehaviorSubject('');
  constructor(private socket: Socket, private httpClient: HttpClient) {}
  connect(nickname: string) {
    this.socket.ioSocket.auth = { nickname };
    this.socket.connect();
  }
  send(message: string, from: string, convId: string) {
    this.socket.emit('private message', { message, from, id: convId });
  }
  get(convId: string): Observable<any> {
    this.socket.on(convId, (message: any) => {
      this.message.next(message);
    });
    return this.message.asObservable();
  }
  findChat(convId: string): Observable<any> {
    return this.httpClient.get(
      `http://localhost:3000/profile/findChat/${convId}`
    );
  }
}
