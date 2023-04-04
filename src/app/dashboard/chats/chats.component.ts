import { Component } from '@angular/core';
import users from '../../_core/Users';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent {
  persons = users;
}
