import { Component, Input } from '@angular/core';
import { Profile } from 'src/app/_core/models/profile.model';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
})
export class OffcanvasComponent {
  @Input() profile!: Profile;
}
