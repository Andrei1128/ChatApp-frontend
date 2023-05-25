import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field, Poll } from 'src/app/_core/models/project.model';
import { ProjectService } from 'src/app/_core/services/project.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
})
export class PollComponent implements OnInit {
  @Input() poll: Poll;
  @Output() changeVisibility = new EventEmitter();
  selectedField: Field;
  noSelectError = false;
  alreadyVoted = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {}

  selectField(field: Field) {
    this.selectedField = field;
    this.noSelectError = false;
    this.alreadyVoted = false;
  }

  submit() {
    if (this.selectedField === undefined) {
      this.noSelectError = true;
      return;
    }
    this.projectService
      .vote(this.poll.projId, this.poll._id, this.selectedField.name)
      .subscribe(
        (res) => {
          this.poll.fields.forEach((f) => {
            if (f === this.selectedField) {
              f.votes.push('x');
            }
          });
        },
        (error) => {
          if (error.error === 'You already voted!') {
            this.alreadyVoted = true;
          }
        }
      );
    this.noSelectError = false;
  }
}
