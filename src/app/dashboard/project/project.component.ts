import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Chat } from 'src/app/_core/models/chat.model';
import { Deadline, Poll, Project } from 'src/app/_core/models/project.model';
import { DataShareService } from 'src/app/_core/services/data-share.service';
import { ProfileService } from 'src/app/_core/services/profile.service';
import { ProjectService } from 'src/app/_core/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  gptChat: Chat = new Chat();
  project: Project = undefined;
  showNotification: boolean = false;
  chatName = new FormControl();
  chatNameError = false;
  pollName = new FormControl();
  pollValue = new FormControl();
  pollNameError = false;
  pollValueError = false;
  pollFieldsError = false;
  deadlineName = new FormControl();
  deadlineNameError = false;
  polls: string[] = [];
  myId: string;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private dataShareService: DataShareService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.gptChat._id = '0';
    this.gptChat.name = 'ChatGPT';
    this.gptChat.participants = [];
    this.gptChat.messages = [];
    this.dataShareService.selectedProject$.subscribe((project) => {
      if (project) this.project = project;
      else this.router.navigate(['/projects']);
    });
    this.profileService.getMyProfile().subscribe((res) => {
      this.myId = res._id;
    });
  }

  getCode() {
    this.projectService.createCode(this.project._id).subscribe((res) => {
      const content = 'Join my project using this code: ' + res;
      navigator.clipboard.writeText(content);
      this.showCopyNotification();
    });
  }
  createChat() {
    const chatName = this.chatName.value.trim();
    if (chatName.length < 4 || chatName.length > 16) {
      this.chatNameError = true;
    } else {
      this.projectService
        .addChat(chatName, this.project._id)
        .subscribe((res) => {
          const currentProfile = this.profileService.myProfile$.value;
          currentProfile.projects = currentProfile.projects.map((p) => {
            if (p._id === this.project._id) p.chats.push(res);
            return p;
          });
          this.profileService.myProfile$.next(currentProfile);
        });
    }
  }
  chatWith(chat: Chat) {
    this.dataShareService.shareChat(chat);
  }

  openPool(poll: Poll) {
    this.dataShareService.sharePoll(poll, this.project._id);
  }
  openDeadline(deadline: Deadline) {
    this.dataShareService.shareDeadline(
      deadline,
      this.project._id,
      this.project.adminId
    );
  }
  gpt() {
    this.dataShareService.shareChat(this.gptChat);
  }

  createPoll() {
    const chatName = this.pollName.value.trim();
    if (chatName.length < 4 || chatName.length > 16) {
      this.pollNameError = true;
      return;
    }
    this.pollNameError = false;
    if (this.polls.length === 0) {
      this.pollFieldsError = true;
      return;
    }
    this.projectService
      .addPoll(chatName, this.polls, this.project._id)
      .subscribe((res) => {
        this.polls = [];
        this.pollFieldsError = false;
        const currentProfile = this.profileService.myProfile$.value;
        currentProfile.projects = currentProfile.projects.map((p) => {
          if (p._id === this.project._id) p.polls.push(res);
          return p;
        });
        this.profileService.myProfile$.next(currentProfile);
      });
  }

  addPollField() {
    const pollField = this.pollValue.value.trim();
    if (pollField.length < 4 || pollField.length > 16)
      this.pollValueError = true;
    else {
      this.pollValue.reset();
      this.polls.push(pollField);
      this.pollFieldsError = false;
    }
  }

  removePollField(name: string) {
    this.polls = this.polls.filter((u) => u != name);
  }

  createDeadline() {
    const chatName = this.deadlineName.value.trim();
    if (chatName.length < 4 || chatName.length > 16) {
      this.deadlineNameError = true;
    } else {
      this.projectService
        .addDeadline(chatName, this.project._id)
        .subscribe((res) => {
          this.deadlineName.reset();
          this.deadlineNameError = false;
          const currentProfile = this.profileService.myProfile$.value;
          currentProfile.projects = currentProfile.projects.map((p) => {
            if (p._id === this.project._id) p.deadlines.push(res);
            return p;
          });
          this.profileService.myProfile$.next(currentProfile);
        });
    }
  }

  showCopyNotification() {
    this.showNotification = true;
    setTimeout(() => {
      this.hideCopyNotification();
    }, 2000);
  }

  hideCopyNotification() {
    this.showNotification = false;
  }
}
