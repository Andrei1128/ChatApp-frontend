import { Profile } from './profile.model';

export class Chat {
  _id?: string;
  name?: string;
  participants?: Profile[];
  messages?: string[];
}
