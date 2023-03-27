import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly serverUrl = 'http://localhost:3000/profile';
  constructor(private httpClient: HttpClient) {}

  createChat(participants: any[]): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/createChat`, {
      participants,
    });
  }
  addFriend(id: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/add`, { id });
  }
  acceptFriend(id: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/accept`, { id });
  }
  declineFriend(id: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/decline`, { id });
  }
  removeFriend(id: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/remove`, { id });
  }
  getMe(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/myProfile`);
  }
  getFriend(id: string): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/friends/${id}`);
  }
  getFriends(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/friends`);
  }
  getPeople(nickname: string): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/peoples/${nickname}`);
  }
}
