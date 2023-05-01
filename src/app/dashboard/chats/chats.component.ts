import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chat } from 'src/app/_core/models/chat.model';
import { customProfile } from 'src/app/_core/models/profile.model';
import { ChatService } from 'src/app/_core/services/chat.service';
import { DataShareService } from 'src/app/_core/services/data-share.service';
import { ProfileService } from 'src/app/_core/services/profile.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  chats: Chat[] = [];
  friends: customProfile[] = [];
  searchChatsForm = new FormControl();
  searchFriendsForm = new FormControl();
  groupName = new FormControl();
  myId?: string;
  activeChatId!: string;
  groupNameError = false;

  constructor(
    private profileService: ProfileService,
    private dataShareService: DataShareService,
    private chatService: ChatService
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

  _getTime(createdAt: Date) {
    const date = new Date(createdAt);
    const diffSeconds = Math.abs(Date.now() - date.getTime()) / 1000;
    const diffMinutes = Math.floor(diffSeconds / 60);

    if (diffSeconds < 15) {
      return 'just now';
    } else if (diffMinutes < 1440) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month}`;
    }
  }

  chatWith(chat: Chat) {
    this.activeChatId = chat._id;
    this.chatService.clearNotifications(chat._id);
    this.dataShareService.shareChat(chat);
  }

  getOnlineClass(chat: Chat) {
    const id =
      chat.participants?.length === 2 &&
      chat.participants?.at(0)?._id === this.myId
        ? chat.participants?.at(1)?._id
        : chat.participants?.at(0)?._id;

    const friend = this.friends.find((friend) => friend._id === id);
    return friend?.online;
  }

  createGroup() {
    const groupName = this.groupName.value.trim();
    if (groupName.length < 3 || groupName.length > 17) {
      this.groupNameError = true;
    } else {
      this.groupNameError = false;
      let selectedFriends: any[] = [];
      selectedFriends = this.friends
        .filter((friend) => friend.selected)
        .map((friend) => friend._id);
      selectedFriends.push(this.myId);
      this.chatService
        .chatWith(selectedFriends, groupName)
        .subscribe((chat) => {
          if (typeof chat === 'string') {
            this.profileService.getMyProfile().subscribe((res) => {
              const chatFound = res.chats?.find((ch) => ch._id === chat);
              if (chatFound) {
                this.dataShareService.shareChat(chatFound);
                this.activeChatId = chatFound._id as string;
              }
            });
          } else {
            this.profileService.myProfile$.value.chats?.push(chat);
            this.dataShareService.shareChat(chat);
            this.activeChatId = chat._id as string;
          }
        });
      this.profileService.getMyProfile().subscribe((res) => {
        this.friends = res.friends;
      });
      this.groupName.reset();
      this.friends = this.friends.map((friend) => {
        friend.selected = false;
        return friend;
      });
    }
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
        this.chats = res.chats.filter(
          (chat) =>
            chat.name?.toLowerCase().includes(searchTerm) ||
            chat.participants?.some(
              (participant) =>
                participant.name?.toLowerCase().includes(searchTerm) &&
                participant._id !== this.myId
            )
        );
      }
    });
  }
}
