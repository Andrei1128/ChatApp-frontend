import { Component } from '@angular/core';
import users from 'src/app/_core/Users';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  persons = users;
}
