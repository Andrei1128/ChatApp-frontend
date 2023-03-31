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
  messageForm = new FormControl();
  findChatForm = new FormControl();
  findPeopleForm = new FormControl();
  findFriendForm = new FormControl();
  image = 'assets/defaultProfileImg.png';
  conversation: any;
  messages = [];
  myProfile: any;
  peoples = [];
  friend: any;
  loaded = false;
  convLoaded = false;
  samePerson = false;
  lastMsgSender = '';
  obs: any;

  constructor(
    private chatService: ChatService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe((me: any) => {
      this.myProfile = me;
      this.loaded = true;
    });
  }

  chatWith(friend: any) {
    this.friend = friend;
    const participants = [friend._id, this.myProfile._id];
    this.chatService.createChat(participants).subscribe((res) => {
      this.myProfile.chats.push(res);
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
      this.myProfile.friends.push(res);
    });
  }
  declineRequest(id: string) {
    this.profileService.declineFriend(id).subscribe((res) => {
      this.myProfile.requests.remove(res);
    });
  }
  convWith(conversation: any) {
    if (this.conversation !== conversation) {
      this.convLoaded = false;
      this.conversation = conversation;
      this.chatService.findChat(conversation._id).subscribe((res) => {
        this.messages = res;
        this.convLoaded = true;
        setTimeout(() => {
          let el = document.getElementById('messages');
          el.scrollTop = el.scrollHeight;
        }, 0);
      });
    }
    this.obs = this.chatService.get(conversation._id);
    this.obs.subscribe((msg) => {
      if (msg) {
        if (msg.from.nickname == this.lastMsgSender) this.samePerson = true;
        this.messages.push(msg);
        this.lastMsgSender = msg.from.nickname;
        let el = document.getElementById('messages');
        setTimeout(() => {
          el.scrollTop = el.scrollHeight;
        }, 0);
      }
    });
  }

  ngOnDestroy(): void {
    this.obs.unsubscribe();
  }

  sendMessage() {
    if (this.conversation) {
      const message = this.messageForm.value.trim();
      this.chatService.send(message, this.myProfile._id, this.conversation._id);
      this.messageForm.setValue('');
    }
  }
  findChat() {}
  findFriend() {}
}
