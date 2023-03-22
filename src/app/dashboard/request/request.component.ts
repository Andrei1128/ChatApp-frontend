import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent {
  @Input() person: any;
  @Output() accept = new EventEmitter();
  @Output() denie = new EventEmitter();
  acceptRequest() {
    this.accept.emit(this.person._id);
  }
  denieRequest() {
    this.denie.emit(this.person._id);
  }
}
