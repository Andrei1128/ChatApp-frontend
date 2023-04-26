import { Message } from './message.model';
import { Profile } from './profile.model';

export class Chat {
  _id: string;
  name: string;
  image: string;
  about: string;
  participants: Profile[];
  messages: Message[];
}
