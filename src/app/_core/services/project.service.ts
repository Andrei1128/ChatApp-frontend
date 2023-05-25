import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly serverUrl = `${environment.apiURL}/project`;
  constructor(private httpClient: HttpClient) {}

  createProject(
    participants: any[],
    name: string,
    description: string
  ): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/project`, {
      participants,
      name,
      description,
    });
  }
  createCode(projId: string): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/createCode`, {
      projId,
    });
  }
  joinProject(code: string): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/join`, {
      code,
    });
  }
  addChat(name: string, projId: string): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/addChat`, {
      name,
      projId,
    });
  }
  addPoll(name: string, fields: string[], projId: string): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/addPoll`, {
      name,
      fields,
      projId,
    });
  }
  vote(projId: string, pollId: string, field: string): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/vote`, {
      projId,
      pollId,
      field,
    });
  }
}
