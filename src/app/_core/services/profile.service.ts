import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly serverUrl = 'http://localhost:3000/profile';
  constructor(private httpClient: HttpClient) {}

  addFriend(id: string): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/${id}`, {});
  }
  acceptFriend(id: string): Observable<any> {
    return this.httpClient.put(`${this.serverUrl}/${id}`, {});
  }
  declineFriend(id: string): Observable<any> {
    return this.httpClient.delete(`${this.serverUrl}/${id}`);
  }
  getMe(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/me`);
  }
  getFriend(id: string): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/${id}`);
  }
  getFriends(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}`);
  }
  getPeople(nickname: string): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}`, { nickname });
  }
}
