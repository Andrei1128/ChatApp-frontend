import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Profile } from 'src/app/_core/models/profile.model';
import { ProfileService } from 'src/app/_core/services/profile.service';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
})
export class OffcanvasComponent implements OnChanges {
  profile: Profile = new Profile();
  @Input() profileId!: string;

  constructor(private profileService: ProfileService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('profileId' in changes) {
      this.profileService.getFriend(this.profileId).subscribe((res) => {
        this.profile = res;
      });
    }
  }
}
