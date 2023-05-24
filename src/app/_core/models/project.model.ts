import { Chat } from './chat.model';
import { Profile } from './profile.model';

export class Project {
  _id: string;
  name: string;
  image: string;
  adminId: string;
  participants: Profile[];
  chats: Chat[];
  pools: Chat[];
  deadlines: Chat[];
}
