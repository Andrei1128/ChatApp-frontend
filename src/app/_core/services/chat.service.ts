import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';
import { ProfileService } from './profile.service';

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

  updateName(id: string, content: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/updateName`, {
      id,
      name: content,
    });
  }
  updateAbout(id: string, content: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/updateAbout`, {
      id,
      about: content,
    });
  }
  updateImage(id: string, image: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/updateImage`, {
      id,
      image,
    });
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

  clearNotifications(convId: string) {
    this.socket.emit('clear notifications', convId);
  }

  findChat(convId: string): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/${convId}`);
  }
}
