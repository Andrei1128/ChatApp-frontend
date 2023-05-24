import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Project } from 'src/app/_core/models/project.model';
import { customProfile } from 'src/app/_core/models/profile.model';
import { ProjectService } from 'src/app/_core/services/project.service';
import { DataShareService } from 'src/app/_core/services/data-share.service';
import { ProfileService } from 'src/app/_core/services/profile.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  friends: customProfile[] = [];
  searchProjectsForm = new FormControl();
  searchFriendsForm = new FormControl();
  projectName = new FormControl();
  projectDescription = new FormControl();
  codeForm = new FormControl();
  myId?: string;
  activeProjectId!: string;
  lastProjectId: string;
  projectNameError = false;
  errorMessage: string;
  codeError = false;

  constructor(
    private profileService: ProfileService,
    private dataShareService: DataShareService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe((res) => {
      if (res.projects && res.friends) {
        this.myId = res._id;
        this.projects = res.projects;
        this.friends = res.friends;
      }
    });
  }
  selectProject(proj: Project) {
    this.dataShareService.shareProject(proj);
  }
  join() {
    const code = this.codeForm.value.trim();
    this.projectService.joinProject(code).subscribe(
      (res) => {
        this.profileService.addProject(res);
        this.codeError = false;
      },
      (error) => {
        this.codeError = true;
        this.errorMessage = error.error;
      }
    );
  }
  createProject() {
    let projectName;
    if (this.projectName.value) projectName = this.projectName.value.trim();
    else projectName = '';
    let projectDescription = this.projectDescription.value;
    if (projectDescription == null) projectDescription = '';
    else projectDescription = projectDescription.trim();
    if (projectName.length < 4 || projectName.length > 16) {
      this.projectNameError = true;
    } else {
      this.projectNameError = false;
      let selectedFriends: any[] = [];
      selectedFriends = this.friends
        .filter((friend) => friend.selected)
        .map((friend) => friend._id);
      selectedFriends.push(this.myId);
      this.projectService
        .createProject(selectedFriends, projectName, projectDescription)
        .subscribe((project) => {
          this.profileService.myProfile$.value.projects?.push(project);
          this.dataShareService.shareProject(project);
        });
      this.profileService.getMyProfile().subscribe((res) => {
        this.friends = res.friends;
      });
      this.projectName.reset();
      this.projectDescription.reset();
      this.friends = this.friends.map((friend) => {
        friend.selected = false;
        return friend;
      });
    }
    console.log(this.projectNameError);
  }

  searchFriends() {
    this.profileService.getMyProfile().subscribe((res) => {
      if (res.friends) {
        const searchTerm = this.searchFriendsForm.value.toLowerCase();
        this.friends = res.friends.filter(
          (frnd) => frnd.name && frnd.name.toLowerCase().includes(searchTerm)
        );
      }
    });
  }

  searchProjects() {
    this.profileService.getMyProfile().subscribe((res) => {
      if (res.projects) {
        const searchTerm = this.searchProjectsForm.value.toLowerCase();
        this.projects = res.projects.filter((project) =>
          project.name?.toLowerCase().includes(searchTerm)
        );
      }
    });
  }
}
