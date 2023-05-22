import { Chat } from './chat.model';
import { Project } from './project.model';

export class Profile {
  _id?: string;
  name?: string;
  image?: string;
  about?: string;
  online?: boolean = false;
  friends?: Profile[];
  chats?: Chat[];
  requests?: Profile[];
  projects?: Project[];
}

export class customProfile extends Profile {
  selected?: boolean = false;
}
