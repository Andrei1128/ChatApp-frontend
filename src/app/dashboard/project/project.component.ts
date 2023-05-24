import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Chat } from 'src/app/_core/models/chat.model';
import { Project } from 'src/app/_core/models/project.model';
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
  poolName = new FormControl();
  poolNameError = false;
  deadlineName = new FormControl();
  deadlineNameError = false;
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
  gpt() {
    this.dataShareService.shareChat(this.gptChat);
  }

  createPool() {
    const chatName = this.chatName.value.trim();
    if (chatName.length < 4 || chatName.length > 16) {
      this.chatNameError = true;
    } else {
    }
  }

  createDeadline() {
    const chatName = this.chatName.value.trim();
    if (chatName.length < 4 || chatName.length > 16) {
      this.chatNameError = true;
    } else {
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
