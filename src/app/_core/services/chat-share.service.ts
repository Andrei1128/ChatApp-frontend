import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chat } from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatShareService {
  private chat = new BehaviorSubject<Chat | undefined>(undefined);
  selectedChat$ = this.chat.asObservable();

  shareChat(chat?: Chat) {
    this.chat.next(chat);
  }
}
