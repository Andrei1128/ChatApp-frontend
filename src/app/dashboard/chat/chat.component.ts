import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  previousMessageFromMe(message: any): boolean {
    const index = this.messages.indexOf(message);
    if (index > 0 && this.messages[index - 1].fromMe) {
      return true;
    }
    return false;
  }
  messages = [
    {
      id: 1,
      text: 'Good Morning',
      sender: 'Patrick Hendricks',
      timestamp: new Date(),
      fromMe: false,
    },
    {
      id: 2,
      text: 'Good morning, How are you? What about our next meeting?',
      sender: 'Mark Messer',
      timestamp: new Date(),
      fromMe: true,
    },
    {
      id: 1,
      text: 'Yeah everything is fine',
      sender: 'Patrick Hendricks',
      timestamp: new Date(),
      fromMe: false,
    },
    {
      id: 2,
      text: '& Next meeting tomorrow 10.00AM',
      sender: 'Patrick Hendricks',
      timestamp: new Date(),
      fromMe: false,
    },
    {
      id: 1,
      text: 'Wow thats great',
      sender: 'Mark Messer',
      timestamp: new Date(),
      fromMe: true,
    },
    {
      id: 1,
      text: 'Good morning, How are you? What about our next meeting?',
      sender: 'Patrick Hendricks',
      timestamp: new Date(),
      fromMe: false,
    },
    {
      id: 1,
      text: 'Yeah everything is fine',
      sender: 'Mark Messer',
      timestamp: new Date(),
      fromMe: true,
    },
    {
      id: 1,
      text: '@Doris Brown please review this code, and give me feedback asap',
      sender: 'Mark Messer',
      timestamp: new Date(),
      fromMe: true,
    },
    {
      id: 1,
      text: 'please, save this pictures to your file and give it to me after you have done with editing!',
      sender: 'Patrick Hendricks',
      timestamp: new Date(),
      fromMe: false,
    },
    {
      id: 1,
      text: 'Good Morning',
      sender: 'Patrick Hendricks',
      timestamp: new Date(),
      fromMe: false,
    },
    {
      id: 2,
      text: 'Good morning, How are you? What about our next meeting?',
      sender: 'Mark Messer',
      timestamp: new Date(),
      fromMe: true,
    },
    {
      id: 1,
      text: 'Yeah everything is fine',
      sender: 'Patrick Hendricks',
      timestamp: new Date(),
      fromMe: false,
    },
    {
      id: 2,
      text: '& Next meeting tomorrow 10.00AM',
      sender: 'Patrick Hendricks',
      timestamp: new Date(),
      fromMe: false,
    },
    {
      id: 1,
      text: 'Wow thats great',
      sender: 'Mark Messer',
      timestamp: new Date(),
      fromMe: true,
    },
    {
      id: 1,
      text: 'Good morning, How are you? What about our next meeting?',
      sender: 'Patrick Hendricks',
      timestamp: new Date(),
      fromMe: false,
    },
    {
      id: 1,
      text: 'Yeah everything is fine',
      sender: 'Mark Messer',
      timestamp: new Date(),
      fromMe: true,
    },
    {
      id: 1,
      text: '@Doris Brown please review this code, and give me feedback asap',
      sender: 'Mark Messer',
      timestamp: new Date(),
      fromMe: true,
    },
    {
      id: 1,
      text: 'please, save this pictures to your file and give it to me after you have done with editing!',
      sender: 'Patrick Hendricks',
      timestamp: new Date(),
      fromMe: false,
    },
  ];
}
