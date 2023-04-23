import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/_core/services/profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  myProfileImage?: string;
  myName?: string;
  constructor(private profileService: ProfileService) {}
  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe((res) => {
      this.myProfileImage = res.image;
      this.myName = res.name;
    });
  }
}
