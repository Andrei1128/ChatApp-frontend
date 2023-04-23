import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';
import { ProfileService } from './profile.service';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly serverUrl = `${environment.apiURL}/chat`;

  public message: BehaviorSubject<any> = new BehaviorSubject('');
  private lastChatListener: string | undefined;

  constructor(
    private socket: Socket,
    private httpClient: HttpClient,
    private profileService: ProfileService
  ) {}

  chatWith(participants: any[], name?: string): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/chat`, {
      participants,
      name,
    });
  }

  deleteChat(id: string): Observable<any> {
    return this.httpClient.delete(`${this.serverUrl}/delete/${id}`);
  }

  connect() {
    this.profileService.getMyProfile().subscribe((res) => {
      const userID = res._id;
      this.socket.ioSocket.auth = { userID };
      this.socket.connect();
    });
  }
  disconnect() {
    this.socket.disconnect();
  }

  send(content: string, from: string, convId: string) {
    this.socket.emit('private message', { content, from }, convId);
  }

  get(convId: string): Observable<Message> {
    this.message.next('');
    if (this.lastChatListener)
      this.socket.removeListener(this.lastChatListener);
    this.socket.on(convId, (message: Message) => {
      this.message.next(message);
    });
    this.lastChatListener = convId;
    return this.message.asObservable();
  }

  findChat(convId: string): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/${convId}`);
  }
}
