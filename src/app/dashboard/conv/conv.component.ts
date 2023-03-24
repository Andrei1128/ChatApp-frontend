import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-conv',
  templateUrl: './conv.component.html',
  styleUrls: ['./conv.component.scss'],
})
export class ConvComponent {
  @Input() friend: any;
  @Output() chat = new EventEmitter();
  image = 'assets/blank-profile-picture-gcd520e96d_640.png';

  chatWith() {
    this.chat.emit(this.friend);
  }
}
