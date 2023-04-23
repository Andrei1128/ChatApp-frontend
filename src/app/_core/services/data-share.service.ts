import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chat } from '../models/chat.model';
import { ProfileService } from './profile.service';
import { Profile } from '../models/profile.model';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root',
})
export class DataShareService {
  private chat = new BehaviorSubject<Chat | undefined>(undefined);
  private profile = new BehaviorSubject<Profile>(new Profile());
  selectedChat$ = this.chat.asObservable();
  selectedProfile$ = this.profile.asObservable();

  constructor(
    private profileService: ProfileService,
    private chatService: ChatService
  ) {}

  clearData() {
    this.chat.next(undefined);
    this.profile.next(new Profile());
  }

  shareChat(chat?: Chat) {
    this.chat.next(chat);
  }

  shareProfile(id: string, flag: boolean) {
    if (flag) {
      this.chatService.findChat(id).subscribe((res) => {
        this.profile.next(res);
      });
    } else {
      this.profileService.getFriend(id).subscribe((res) => {
        this.profile.next(res);
      });
    }
  }
}
