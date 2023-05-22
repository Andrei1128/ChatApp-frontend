import { Profile } from './profile.model';

export class Project {
  _id: string;
  name: string;
  image: string;
  adminId: string;
  participants: Profile[];
}
