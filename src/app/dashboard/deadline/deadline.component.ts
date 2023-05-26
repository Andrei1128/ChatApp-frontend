import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Deadline, Field } from 'src/app/_core/models/project.model';
import { ProfileService } from 'src/app/_core/services/profile.service';
import { ProjectService } from 'src/app/_core/services/project.service';

@Component({
  selector: 'app-deadline',
  templateUrl: './deadline.component.html',
  styleUrls: ['./deadline.component.scss'],
})
export class DeadlineComponent implements OnInit {
  @Input() deadline: Deadline;
  @Output() changeVisibility = new EventEmitter();
  deadlineName = new FormControl();
  deadlineDate = new FormControl();
  deadlineNameError = false;
  deadlineDateError = false;
  minDate: string;
  myId: string;

  constructor(
    private profileService: ProfileService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe((res) => {
      this.myId = res._id;
    });
    this.minDate = new Date().toISOString().split('T')[0];
  }

  formatDate(date: Date): string {
    const fieldDate = new Date(date);
    const formattedDate = fieldDate
      .toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
      .toUpperCase();
    return formattedDate;
  }

  closeDeadline() {
    this.changeVisibility.emit();
  }

  deleteEndline(id: string) {
    this.projectService
      .deleteEndline(id)
      .subscribe(
        (res) =>
          (this.deadline.endlines = this.deadline.endlines.filter(
            (f) => f._id !== id
          ))
      );
  }

  createEndline() {
    const endlineName = this.deadlineName.value.trim();
    if (endlineName.length < 4 || endlineName.length > 16) {
      this.deadlineNameError = true;
      return;
    }
    this.deadlineNameError = false;

    const date = new Date(this.deadlineDate.value);
    if (isNaN(date.getTime())) {
      this.deadlineDateError = true;
      return;
    }
    this.deadlineDateError = false;

    this.projectService
      .addEndline(endlineName, date, this.deadline._id, this.deadline.projId)
      .subscribe((res) => {
        this.deadline.endlines.push(res);
        const currentProfile = this.profileService.myProfile$.value;
        currentProfile.projects = currentProfile.projects.map((p) => {
          if (p._id === this.deadline.projId) {
            for (let endline of p.deadlines) {
              if (endline._id === this.deadline._id) endline.endlines.push(res);
            }
          }
          return p;
        });
        this.profileService.myProfile$.next(currentProfile);
      });
  }
}
