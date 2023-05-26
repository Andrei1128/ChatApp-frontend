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
  addDeadline(name: string, projId: string): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/addDeadline`, {
      name,
      projId,
    });
  }

  deleteEndline(id: string): Observable<any> {
    return this.httpClient.delete(`${this.serverUrl}/deleteEndline/${id}`);
  }
  vote(projId: string, pollId: string, field: string): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/vote`, {
      projId,
      pollId,
      field,
    });
  }
  addEndline(
    name: string,
    date: Date,
    id: string,
    projId: string
  ): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/addEndline`, {
      name,
      date,
      id,
      projId,
    });
  }
}
