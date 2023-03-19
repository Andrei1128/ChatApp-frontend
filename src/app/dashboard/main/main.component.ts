import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/_core/services/chat.service';
import { FormControl } from '@angular/forms';
import { ProfileService } from 'src/app/_core/services/profile.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  message = new FormControl('');
  messages = [];
  friends = [];

  constructor(
    private chatService: ChatService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.chatService.get().subscribe((message: string) => {
      this.messages.push(message);
    });
    this.profileService.getFriends().subscribe((friends: any) => {
      this.friends = friends;
    });
  }

  send() {
    const content = this.message.value?.trim();
    if (content) {
      this.chatService.send(content);
    }
    this.message.reset();
  }
}
