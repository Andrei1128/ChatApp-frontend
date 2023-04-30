import { Profile } from './profile.model';

export class Message {
  _id: string;
  content: string;
  from: Profile;
  createdAt: Date;
}
