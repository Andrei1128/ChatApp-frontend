import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent {
  @Input() person: any;
  @Output() accept = new EventEmitter();
  @Output() decline = new EventEmitter();
  acceptRequest() {
    this.accept.emit(this.person);
  }
  denieRequest() {
    this.decline.emit(this.person);
  }
}
