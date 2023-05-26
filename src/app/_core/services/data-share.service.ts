import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Chat } from '../models/chat.model';
import { ProfileService } from './profile.service';
import { Profile } from '../models/profile.model';
import { Deadline, Poll, Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class DataShareService {
  private chat = new BehaviorSubject<Chat | undefined>(undefined);
  private poll = new BehaviorSubject<Poll | undefined>(undefined);
  private deadline = new BehaviorSubject<Deadline | undefined>(undefined);
  private profile = new BehaviorSubject<Profile | Chat>(new Profile());
  private project = new BehaviorSubject<Project | undefined>(undefined);
  selectedDeadline$ = this.deadline.asObservable();
  selectedPoll$ = this.poll.asObservable();
  selectedProject$ = this.project.asObservable();
  selectedChat$ = this.chat.asObservable();
  selectedProfile$ = this.profile.asObservable();

  constructor(private profileService: ProfileService) {}

  clearData() {
    this.project.next(undefined);
    this.chat.next(undefined);
    this.profile.next(new Profile());
  }

  shareChat(chat: Chat) {
    this.chat.next(chat);
  }
  sharePoll(poll: Poll, projId: string) {
    poll.projId = projId;
    this.poll.next(poll);
  }
  shareDeadline(deadline: Deadline, projId: string, adminId: string) {
    deadline.projId = projId;
    deadline.adminId = adminId;
    this.deadline.next(deadline);
  }
  shareProject(project: Project) {
    this.project.next(project);
  }

  shareProfile(id: string, flag: boolean) {
    var subscription: Subscription;
    if (flag) {
      subscription = this.profileService.getMyProfile().subscribe((res) => {
        const chatFound = res.chats.find((chat) => chat._id === id);
        this.profile.next(chatFound);
      });
    } else {
      subscription = this.profileService.getMyProfile().subscribe((res) => {
        const profileFound = res.friends.find((chat) => chat._id === id);
        if (profileFound) this.profile.next(profileFound);
      });
    }
    subscription.unsubscribe();
  }
}
