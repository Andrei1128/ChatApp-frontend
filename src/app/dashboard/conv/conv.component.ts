import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-conv',
  templateUrl: './conv.component.html',
  styleUrls: ['./conv.component.scss'],
})
export class ConvComponent {
  @Input() friend: any;
  @Output() chat = new EventEmitter();

  chatWith() {
    this.chat.emit(this.friend);
  }
}
