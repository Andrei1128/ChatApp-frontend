import { Component } from '@angular/core';
import users from 'src/app/_core/Users';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['../friends.component.scss'],
})
export class FriendsListComponent {
  persons = users;
}
