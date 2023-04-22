import { Chat } from './chat.model';

export class Profile {
  _id?: string;
  name?: string;
  image?: string;
  about?: string;
  friends?: Profile[];
  chats?: Chat[];
  requests?: Profile[];
}
