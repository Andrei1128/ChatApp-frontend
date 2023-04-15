import { Component } from '@angular/core';
import { Profile } from 'src/app/_core/models/profile.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects: any[] = [];
  friends: Profile[] = [];
  activeProject: any;
}
