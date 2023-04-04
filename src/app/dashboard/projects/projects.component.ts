import { Component } from '@angular/core';
import users from 'src/app/_core/Users';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  persons = users;
}
