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
  message = new FormControl();
  findFriend = new FormControl();
  addFriend = new FormControl();
  messages = [];
  friends = [];
  friend: any;
  loaded = false;

  constructor(
    private chatService: ChatService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.chatService.get(this.friend).subscribe((message: string) => {
      this.messages.push(message);
    });
    this.profileService.getFriends().subscribe((friends: any) => {
      this.friends = friends;
      this.friend = friends[0];
      this.loaded = true;
    });
  }

  sendMessage() {
    console.log(this.friend);
    const content = this.message.value?.trim();
    if (content) {
      this.chatService.send(this.friend, content);
    }
    this.message.reset();
  }
  chatWith(friend: any) {
    this.friend = friend;
  }
  find() {}
  add() {}
}
