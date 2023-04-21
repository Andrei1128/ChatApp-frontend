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

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges {
  @Input() chat!: Chat;
  myProfile!: Profile;
  messageForm = new FormControl();
  @ViewChild('mainContainer') mainContainer!: ElementRef;
  ChatSubscription?: Subscription;
  @Output() changeVisibility = new EventEmitter();

  constructor(
    private profileService: ProfileService,
    private chatService: ChatService,
    private dataShareService: DataShareService
  ) {}

  ngOnInit(): void {
    this.profileService
      .getMyProfile()
      .subscribe((res) => (this.myProfile = res));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('chat' in changes) {
      setTimeout(() => {
        this.updateScrollbar();
      });
      if (this.ChatSubscription) this.ChatSubscription.unsubscribe();
      this.ChatSubscription = this.chatService
        .get(this.chat._id as string)
        .subscribe((msg) => {
          if (msg) {
            this.chat?.messages?.push(msg);
            setTimeout(() => {
              this.updateScrollbar();
            });
          }
        });
    }
  }

  closeChat() {
    this.changeVisibility.emit();
  }

  viewProfile() {
    let id;
    const participants = this.chat.participants;
    if (participants && participants[0]._id === this.myProfile._id)
      id = participants[1]._id;
    else id = participants && participants[0]._id;
    this.dataShareService.shareProfile(id as string);
  }

  deleteChat() {
    this.chatService.deleteChat(this.chat._id as string).subscribe((res) => {
      this.dataShareService.shareChat(undefined);
      const currentProfile = this.profileService.myProfile$.value;
      currentProfile.chats = currentProfile.chats?.filter(
        (chat: Chat) => chat._id !== this.chat._id
      );
      this.profileService.myProfile$.next(currentProfile);
    });
  }

  updateScrollbar() {
    const mainContainer = this.mainContainer.nativeElement;
    mainContainer.scrollTo({
      top: mainContainer.scrollHeight,
      behavior: 'smooth',
    });
  }

  sendMessage() {
    const content = this.messageForm.value.trim();
    if (content)
      this.chatService.send(
        content,
        this.myProfile._id as string,
        this.chat._id as string
      );
    this.messageForm.reset();
  }
}
