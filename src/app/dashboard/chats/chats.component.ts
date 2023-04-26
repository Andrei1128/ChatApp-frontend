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

  chatWith(chat: Chat) {
    this.activeChatId = chat._id as string;
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
    let selectedFriends: any[] = [];
    selectedFriends = this.friends
      .filter((friend) => friend.selected)
      .map((friend) => friend._id);
    selectedFriends.push(this.myId);
    this.chatService
      .chatWith(selectedFriends, this.groupName.value)
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
    this.groupName.reset();
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
