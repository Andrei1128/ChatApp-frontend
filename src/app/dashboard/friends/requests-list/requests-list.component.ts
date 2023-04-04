import { Component } from '@angular/core';
import users from 'src/app/_core/Users';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['../friends.component.scss'],
})
export class RequestsListComponent {
  persons = users;
}
