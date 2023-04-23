import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Profile } from 'src/app/_core/models/profile.model';
import { DataShareService } from 'src/app/_core/services/data-share.service';
import { ChatService } from 'src/app/_core/services/chat.service';
import { ProfileService } from 'src/app/_core/services/profile.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['../friends.component.scss'],
})
export class FriendsListComponent {
  friends: Profile[] = [];
  myId?: string;
  searchFriendsForm = new FormControl();

  constructor(
    private profileService: ProfileService,
    private chatService: ChatService,
    private dataShareService: DataShareService
  ) {}

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe((res) => {
      if (res.friends && res._id) {
        this.friends = res.friends;
        this.myId = res._id;
      }
    });
  }

  chatWith(id?: string) {
    const participants = [id, this.myId];
    this.chatService.chatWith(participants).subscribe((chat) => {
      if (typeof chat === 'string') {
        this.profileService.getMyProfile().subscribe((res) => {
          const chatFound = res.chats?.find((ch) => ch._id === chat);
          if (chatFound) this.dataShareService.shareChat(chatFound);
        });
      } else {
        this.profileService.myProfile$.value.chats?.push(chat);
        this.dataShareService.shareChat(chat);
      }
    });
  }

  removeFriend(id?: string) {
    this.profileService.removeFriend(id as string).subscribe();
  }

  search() {
    this.profileService.getMyProfile().subscribe((res) => {
      if (res.friends) {
        const searchTerm = this.searchFriendsForm.value.toLowerCase();
        this.friends = res.friends.filter(
          (frnd) => frnd.name && frnd.name.toLowerCase().includes(searchTerm)
        );
      }
    });
  }

  viewProfile(id?: string) {
    this.dataShareService.shareProfile(id as string, false);
  }
}
