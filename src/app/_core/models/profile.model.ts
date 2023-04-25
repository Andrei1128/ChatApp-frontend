import { Chat } from './chat.model';

export class Profile {
  _id?: string;
  name?: string;
  image?: string;
  about?: string;
  online?: boolean;
  friends?: Profile[];
  chats?: Chat[];
  requests?: Profile[];
}

export class customProfile extends Profile {
  selected?: boolean = false;
}
