import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/_core/services/chat.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  message = new FormControl('');
  messages = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.get().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  send() {
    const content = this.message.value?.trim();
    if (content) {
      this.chatService.send(content);
    }
    this.message.reset();
  }
}
