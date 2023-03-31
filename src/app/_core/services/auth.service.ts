import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly serverUrl = `${environment.apiURL}/auth`;

  constructor(private httpClient: HttpClient) {}

  login(body: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/login`, body);
  }
  register(body: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/register`, body);
  }
  logout(): Observable<any> {
    return this.httpClient.delete(`${this.serverUrl}/logout`);
  }
}
