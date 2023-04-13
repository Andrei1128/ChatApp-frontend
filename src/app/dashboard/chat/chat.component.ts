import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/_core/models/chat.model';
import { ChatShareService } from 'src/app/_core/services/chat-share.service';
import { ProfileService } from 'src/app/_core/services/profile.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() chat?: Chat;
  myName?: string;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService
      .getMyProfile()
      .subscribe((res) => (this.myName = res.name));
    console.log(this.chat?._id);
  }
}
