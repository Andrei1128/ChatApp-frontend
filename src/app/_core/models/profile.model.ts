import { Chat } from './chat.model';

export class Profile {
  _id?: string;
  name?: string;
  about?: string;
  friends?: Profile[];
  chats?: Chat[];
  requests?: Profile[];
}
