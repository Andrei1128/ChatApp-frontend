import { Message } from './message.model';
import { Profile } from './profile.model';

export class UserUtil {
  userId: string;
  notifications: number;
  deletedAt: number;
}

export class Chat {
  _id: string;
  name: string;
  image: string;
  about: string;
  userUtil: UserUtil[];
  notifications: number;
  participants: Profile[];
  messages: Message[];
}
