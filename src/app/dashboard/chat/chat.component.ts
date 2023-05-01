import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chat } from 'src/app/_core/models/chat.model';
import { Profile } from 'src/app/_core/models/profile.model';
import { ChatService } from 'src/app/_core/services/chat.service';
import { ProfileService } from 'src/app/_core/services/profile.service';
import { Subscription } from 'rxjs';
import { DataShareService } from 'src/app/_core/services/data-share.service';
import { Message } from 'src/app/_core/models/message.model';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges {
  @Input() chat: Chat;
  searchMessageForm: FormControl = new FormControl();
  myProfile: Profile;
  messageForm = new FormControl();
  @ViewChild('mainContainer') mainContainer: ElementRef;
  ChatSubscription?: Subscription;
  @Output() changeVisibility = new EventEmitter();
  isAtBottom: boolean = true;
  firstLoad: boolean = true;

  constructor(
    private profileService: ProfileService,
    private chatService: ChatService,
    private dataShareService: DataShareService,
    private socket: Socket
  ) {}

  ngOnInit(): void {
    this.profileService
      .getMyProfile()
      .subscribe((res) => (this.myProfile = res));

    //Chat message
    this.socket.on('chat message', (res: any) => {
      const currentProfile = this.profileService.myProfile$.value;
      let targetChatIndex = currentProfile.chats.findIndex(
        (chat) => chat._id === res.convId
      );
      if (targetChatIndex !== -1) {
        currentProfile.chats[targetChatIndex].messages.push({
          ...res.message,
          createdAt: new Date(),
        });
        if (currentProfile.chats[targetChatIndex]._id !== this.chat?._id)
          currentProfile.chats[targetChatIndex].notifications++;
        const targetChat = currentProfile.chats.splice(targetChatIndex, 1)[0];
        currentProfile.chats.push(targetChat);
        this.profileService.myProfile$.next(currentProfile);
        if (res.convId === this.chat?._id) this.updateScrollbar(true);
      }
    });

    //Update name
    this.socket.on('new chat name', (res: any) => {
      const currentProfile = this.profileService.myProfile$.value;
      let targetChatIndex = currentProfile.chats.findIndex(
        (chat) => chat._id === res.id
      );
      if (targetChatIndex !== -1) {
        let message = {
          content: `Group name changed to '${res.name}'`,
          createdAt: new Date(),
        };
        currentProfile.chats[targetChatIndex].messages.push(message as Message);
        currentProfile.chats[targetChatIndex].name = res.name;
        if (currentProfile.chats[targetChatIndex]._id !== this.chat?._id)
          currentProfile.chats[targetChatIndex].notifications++;
        const targetChat = currentProfile.chats.splice(targetChatIndex, 1)[0];
        currentProfile.chats.push(targetChat);
        this.profileService.myProfile$.next(currentProfile);
        if (res.id === this.chat?._id) this.updateScrollbar(true);
      }
    });

    //Update image
    this.socket.on('new chat image', (res: any) => {
      const currentProfile = this.profileService.myProfile$.value;
      let targetChatIndex = currentProfile.chats.findIndex(
        (chat) => chat._id === res.id
      );
      if (targetChatIndex !== -1) {
        let message = {
          content: 'Group image updated',
          createdAt: new Date(),
        };
        currentProfile.chats[targetChatIndex].messages.push(message as Message);
        currentProfile.chats[targetChatIndex].image = res.image;
        if (currentProfile.chats[targetChatIndex]._id !== this.chat?._id)
          currentProfile.chats[targetChatIndex].notifications++;
        const targetChat = currentProfile.chats.splice(targetChatIndex, 1)[0];
        currentProfile.chats.push(targetChat);
        this.profileService.myProfile$.next(currentProfile);
        if (res.id === this.chat?._id) this.updateScrollbar(true);
      }
    });

    //Update about
    this.socket.on('new chat about', (res: any) => {
      const currentProfile = this.profileService.myProfile$.value;
      let targetChatIndex = currentProfile.chats.findIndex(
        (chat) => chat._id === res.id
      );
      if (targetChatIndex !== -1) {
        let message = {
          content: 'Group info updated',
          createdAt: new Date(),
        };
        currentProfile.chats[targetChatIndex].messages.push(message as Message);
        currentProfile.chats[targetChatIndex].about = res.about;
        if (currentProfile.chats[targetChatIndex]._id !== this.chat?._id)
          currentProfile.chats[targetChatIndex].notifications++;
        const targetChat = currentProfile.chats.splice(targetChatIndex, 1)[0];
        currentProfile.chats.push(targetChat);
        this.profileService.myProfile$.next(currentProfile);
        if (res.id === this.chat?._id) this.updateScrollbar(true);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('chat' in changes) {
      const currentProfile = this.profileService.myProfile$.value;
      currentProfile.chats = currentProfile.chats.map((chat) => {
        if (chat._id === this.chat?._id) {
          chat.notifications = 0;
        }
        return chat;
      });
      this.profileService.myProfile$.next(currentProfile);
      this.firstLoad = true;
      this.updateScrollbar(true);
    }
  }

  searchMessage() {
    this.profileService.getMyProfile().subscribe((res) => {
      if (res.chats) {
        const searchTerm = this.searchMessageForm.value.toLowerCase();
        const chat = res.chats.find((chat) => chat._id === this.chat._id);
        this.chat.messages = chat.messages.filter((msg) =>
          msg.content.toLowerCase().includes(searchTerm)
        );
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
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month} at ${hours}:${minutes}`;
    }
  }

  getOnlineClass() {
    const id =
      this.chat.participants.length === 2 &&
      this.chat.participants.at(0)._id === this.myProfile._id
        ? this.chat.participants.at(1)._id
        : this.chat.participants.at(0)._id;

    if (this.myProfile.friends)
      var friend = this.myProfile.friends.find((friend) => friend._id === id);
    return friend.online;
  }

  closeChat() {
    this.changeVisibility.emit();
  }

  viewProfile() {
    let id;
    if (this.chat.name) {
      id = this.chat._id;
      this.dataShareService.shareProfile(id as string, true);
    } else {
      const participants = this.chat.participants;
      if (participants && participants[0]._id === this.myProfile._id)
        id = participants[1]._id;
      else id = participants && participants[0]._id;
      this.dataShareService.shareProfile(id as string, false);
    }
  }

  deleteChat() {
    this.chatService.deleteChat(this.chat._id as string).subscribe((res) => {
      this.dataShareService.shareChat(undefined);
      const currentProfile = this.profileService.myProfile$.value;
      currentProfile.chats = currentProfile.chats.filter(
        (chat: Chat) => chat._id !== this.chat._id
      );
      this.profileService.myProfile$.next(currentProfile);
    });
  }

  updateScrollbar(flag: boolean) {
    const mainContainer = this.mainContainer?.nativeElement;
    if (mainContainer) {
      if (!this.firstLoad)
        if (flag) {
          this.isAtBottom =
            mainContainer.scrollTop + mainContainer.clientHeight >=
            mainContainer.scrollHeight;
        } else {
          this.isAtBottom = true;
        }
      if (this.isAtBottom || this.firstLoad) {
        setTimeout(() => {
          mainContainer.scrollTo({
            top: mainContainer.scrollHeight,
            behavior: 'smooth',
          });
          this.firstLoad = false;
        });
      }
    }
    // trash
    else {
      setTimeout(() => {
        const mainContainer = this.mainContainer?.nativeElement;
        if (mainContainer) {
          if (!this.firstLoad)
            if (flag) {
              this.isAtBottom =
                mainContainer.scrollTop + mainContainer.clientHeight >=
                mainContainer.scrollHeight;
            } else {
              this.isAtBottom = true;
            }
          if (this.isAtBottom || this.firstLoad) {
            setTimeout(() => {
              mainContainer.scrollTo({
                top: mainContainer.scrollHeight,
                behavior: 'smooth',
              });
              this.firstLoad = false;
            });
          }
        }
      });
    }
  }

  sendMessage() {
    if (this.messageForm.value) {
      var content = this.messageForm.value.trim();
      if (content)
        this.chatService.send(
          content,
          this.myProfile._id as string,
          this.chat._id as string
        );
      const message = {
        content: content,
        from: this.myProfile,
        createdAt: new Date(),
      };
      this.chat.messages.push(message as Message);
      const currentProfile = this.profileService.myProfile$.value;
      const targetChatIndex = currentProfile.chats.findIndex(
        (chat) => chat._id === this.chat._id
      );
      if (targetChatIndex !== -1) {
        const targetChat = currentProfile.chats.splice(targetChatIndex, 1)[0];
        currentProfile.chats.push(targetChat);
        this.profileService.myProfile$.next(currentProfile);
      }
      this.updateScrollbar(true);
      this.messageForm.reset();
    }
  }
}
