import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/_core/services/chat.service';
import { FormControl } from '@angular/forms';
import { ProfileService } from 'src/app/_core/services/profile.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  messageForm = new FormControl();
  findChatForm = new FormControl();
  findPeopleForm = new FormControl();
  findFriendForm = new FormControl();
  image = 'assets/defaultProfileImg.png';
  conversation: any;
  messages: any[] = [];
  myProfile: any;
  peoples: any[] = [];
  requests: any[] = [];
  friends: any[] = [];
  loaded = false;
  convLoaded = false;
  samePerson = false;
  lastMsgSender = '';
  obs: Subscription = new Subscription();

  constructor(
    private chatService: ChatService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe((res: any) => {
      this.myProfile = res;
      this.loaded = true;
    });
  }

  newChat(friend: any) {
    const participants = [friend._id, this.myProfile._id];
    this.chatService.createChat(participants).subscribe((res) => {
      this.myProfile.chats.push(res);
    });
  }

  getFriends() {
    this.profileService.getFriends().subscribe((res) => {
      this.friends = res;
    });
  }

  getRequests() {
    this.profileService.getRequests().subscribe((res) => {
      this.requests = res;
    });
  }

  findPeople() {
    this.profileService
      .getPeople(this.findPeopleForm.value)
      .subscribe((res: any) => {
        this.peoples = res;
        this.findPeopleForm.setValue('');
      });
  }

  sendRequest(id: string) {
    this.profileService.addFriend(id).subscribe();
  }

  acceptRequest(id: string) {
    this.profileService.acceptFriend(id).subscribe((res) => {
      if (res === 200)
        this.requests = this.requests.filter((item) => item == id);
    });
  }

  declineRequest(id: string) {
    this.profileService.declineFriend(id).subscribe((res) => {
      if (res === 200) {
        this.requests = this.requests.filter((item) => item == id);
      }
    });
  }

  chatWith(conversation: any) {
    this.obs.unsubscribe();
    if (this.conversation !== conversation) {
      this.convLoaded = false;
      this.conversation = conversation;
      this.loadMessages();
    }
    this.obs = this.chatService.get(conversation._id).subscribe((msg: any) => {
      let el = document.getElementById('messages');
      if (msg) {
        if (msg.from.nickname == this.lastMsgSender) this.samePerson = true;
        this.messages.push(msg);
        this.lastMsgSender = msg.from.nickname;
        setTimeout(() => {
          if (el) el.scrollTop = el.scrollHeight;
        }, 0);
      }
    });
  }

  sendMessage() {
    if (this.conversation) {
      const message = this.messageForm.value.trim();
      this.chatService.send(message, this.myProfile._id, this.conversation._id);
      this.messageForm.setValue('');
      let el = document.getElementById('messages');
      setTimeout(() => {
        if (el) el.scrollTop = el.scrollHeight;
      }, 0);
    }
  }

  findChat() {}

  findFriend() {}

  private loadMessages(): void {
    this.chatService.findChat(this.conversation._id).subscribe((res) => {
      this.messages = res;
      this.convLoaded = true;
      let el = document.getElementById('messages');
      setTimeout(() => {
        if (el) el.scrollTop = el.scrollHeight;
      }, 0);
    });
  }
}
