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
  image = 'assets/blank-profile-picture-gcd520e96d_640.png';
  conversation: any;
  messages = [];
  myProfile: any;
  peoples = [];
  friend: any;
  loaded = false;

  constructor(
    private chatService: ChatService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService.getMe().subscribe((me: any) => {
      this.myProfile = me;
      this.loaded = true;
      this.chatService.connect(me.nickname);
    });
  }

  chatWith(friend: any) {
    this.friend = friend;
    const participants = [friend._id, this.myProfile._id];
    this.profileService.createChat(participants).subscribe((res) => {
      this.myProfile.chats.push(res);
    });
  }
  findPeople() {
    this.profileService
      .getPeople(this.findPeopleForm.value)
      .subscribe((res: any) => {
        this.peoples = res;
      });
  }
  sendRequest(id: string) {
    this.profileService.addFriend(id);
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
    this.conversation = conversation;
    this.chatService.findChat(conversation._id).subscribe((res) => {
      this.messages = res;
      let el = document.getElementById('messages');
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 0);
    });
    this.chatService.get(conversation._id).subscribe((msg) => {
      if (msg) {
        this.messages.push(msg);
        let el = document.getElementById('messages');
        setTimeout(() => {
          el.scrollTop = el.scrollHeight;
        }, 0);
      }
    });
  }

  sendMessage() {
    if (this.conversation) {
      const message = this.messageForm.value.trim();
      // this.messages.push({ content: message, from: this.myProfile });
      this.chatService.send(message, this.myProfile._id, this.conversation._id);
      this.messageForm.setValue('');
    }
  }
  findChat() {}
  findFriend() {}
}
