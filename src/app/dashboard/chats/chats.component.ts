import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chat } from 'src/app/_core/models/chat.model';
import { Profile } from 'src/app/_core/models/profile.model';
import { DataShareService } from 'src/app/_core/services/data-share.service';
import { ProfileService } from 'src/app/_core/services/profile.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  chats: Chat[] = [];
  friends: Profile[] = [];
  searchChatsForm = new FormControl();
  searchFriendsForm = new FormControl();
  myId?: string;
  activeChat!: Chat;

  constructor(
    private profileService: ProfileService,
    private dataShareService: DataShareService
  ) {}

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe((res) => {
      if (res.chats && res.friends) {
        this.myId = res._id;
        this.chats = res.chats;
        this.friends = res.friends;
      }
    });
  }

  chatWith(chat: Chat) {
    this.activeChat = chat;
    this.dataShareService.shareChat(chat);
  }

  searchFriends() {
    this.profileService.getMyProfile().subscribe((res) => {
      if (res.friends) {
        const searchTerm = this.searchFriendsForm.value.toLowerCase();
        this.friends = res.friends.filter(
          (frnd) => frnd.name && frnd.name.toLowerCase().includes(searchTerm)
        );
      }
    });
  }

  searchChats() {
    this.profileService.getMyProfile().subscribe((res) => {
      if (res.chats) {
        const searchTerm = this.searchChatsForm.value.toLowerCase();
        // this.chats = res.chats.filter(
        //   (chat) => chat.name && chat.name.toLowerCase().includes(searchTerm)
        // );

        // Nu exista numele la conversatie!
      }
    });
  }
}
