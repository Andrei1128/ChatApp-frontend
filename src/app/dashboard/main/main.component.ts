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
  findPeople = new FormControl();
  image = 'assets/blank-profile-picture-gcd520e96d_640.png';
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
    });
  }

  sendMessage() {}
  chatWith(friend: any) {
    this.friend = friend;
  }
  findPpl() {
    this.profileService
      .getPeople(this.findPeople.value)
      .subscribe((res: any) => {
        this.peoples = res;
      });
  }
  sendRequest(id: string) {
    this.profileService.addFriend(id).subscribe((res) => {});
  }
  acceptRequest(id: string) {
    this.profileService.acceptFriend(id).subscribe((res) => {});
  }
  denieRequest(id: string) {
    this.profileService.declineFriend(id).subscribe((res) => {});
  }
  findFrnd() {}
}
