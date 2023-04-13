import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly serverUrl = `${environment.apiURL}/chat`;

  public message: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(private socket: Socket, private httpClient: HttpClient) {}

  chatWith(participants: any[]): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/chat`, {
      participants,
    });
  }

  send(content: string, from: string, convId: string) {
    this.socket.emit('private message', { content, from }, convId);
  }

  get(convId: string): Observable<any> {
    this.socket.on(convId, (message: any) => {
      this.message.next(message);
    });
    return this.message.asObservable();
  }

  findChat(convId: string): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/${convId}`);
  }
}
