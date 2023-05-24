import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatGPTService {
  constructor(private httpClient: HttpClient) {}

  ask(text: string) {
    return this.httpClient.post<{ result: { role: string; content: string } }>(
      `http://localhost:3000/GPT`,
      { text_message: text }
    );
  }
}
