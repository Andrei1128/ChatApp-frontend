import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent {
  @Input() people: any;
  @Output() add = new EventEmitter();
  sendRequest() {
    this.add.emit(this.people._id);
  }
}
