import { Chat } from './chat.model';
import { Profile } from './profile.model';

export class Poll {
  _id: string;
  name: string;
  fields: Field[];
  projId: string;
}
export class Field {
  name: string;
  votes: string[]; //ids de useri, se pot popula
}

export class Project {
  _id: string;
  name: string;
  image: string;
  adminId: string;
  participants: Profile[];
  chats: Chat[];
  polls: Poll[];
  deadlines: Chat[];
}
