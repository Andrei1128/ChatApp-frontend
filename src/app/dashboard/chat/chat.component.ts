import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  image = 'assets/blank-profile-picture-gcd520e96d_640.png';
  @Input() conversation: any;
  @Output() conv = new EventEmitter();
  chatWith() {
    this.conv.emit(this.conversation);
  }
}
