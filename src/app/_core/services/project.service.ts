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
}
