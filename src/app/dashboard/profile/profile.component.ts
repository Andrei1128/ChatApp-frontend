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

  uploadFile(event: any) {
    const imageFile = event.target.files[0];
    if (!imageFile.type.startsWith('image/')) {
      console.error('Selected file is not an image');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
            img,
            (img.width - size) / 2,
            (img.height - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
          );
          const dataUrl = canvas.toDataURL();
          this.profileService.updateImage(dataUrl).subscribe(() => {
            this.myProfile.image = dataUrl;
            this.profileService.myProfile$.next(this.myProfile);
          });
        } else {
          console.error('Failed to get canvas context');
        }
      };
    };
  }

  editInfo(elem: string) {
    const icons = document.getElementsByClassName('targetedIcons');
    if (elem === 'name') {
      if (this.showNameInput == false)
        icons[0].classList.replace('bi-pencil-fill', 'bi-check-lg');
      else {
        icons[0].classList.replace('bi-check-lg', 'bi-pencil-fill');
        this.profileService
          .updateName(this.myProfile.name as string)
          .subscribe();
      }
      this.showNameInput = !this.showNameInput;
    } else {
      if (this.showAboutTextarea == false)
        icons[1].classList.replace('bi-pencil-fill', 'bi-check-lg');
      else {
        icons[1].classList.replace('bi-check-lg', 'bi-pencil-fill');
        this.profileService
          .updateAbout(this.myProfile.about as string)
          .subscribe();
      }
      this.showAboutTextarea = !this.showAboutTextarea;
    }
  }
}
