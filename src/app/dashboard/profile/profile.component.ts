import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/_core/models/profile.model';
import { ProfileService } from 'src/app/_core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  myProfile = new Profile();
  showNameInput = false;
  showAboutTextarea = false;
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService
      .getMyProfile()
      .subscribe((res) => (this.myProfile = res));
  }

  editInfo(elem: string) {
    const icons = document.getElementsByClassName('targetedIcons');
    if (elem === 'name') {
      if (this.showNameInput == false)
        icons[0].classList.replace('bi-pencil-fill', 'bi-check-lg');
      else {
        icons[0].classList.replace('bi-check-lg', 'bi-pencil-fill');
        this.profileService
          .updateName(
            this.myProfile.name as string,
            this.myProfile._id as string
          )
          .subscribe();
      }
      this.showNameInput = !this.showNameInput;
    } else {
      if (this.showAboutTextarea == false)
        icons[1].classList.replace('bi-pencil-fill', 'bi-check-lg');
      else {
        icons[1].classList.replace('bi-check-lg', 'bi-pencil-fill');
        this.profileService
          .updateAbout(
            this.myProfile.about as string,
            this.myProfile._id as string
          )
          .subscribe();
      }
      this.showAboutTextarea = !this.showAboutTextarea;
    }
  }
}
