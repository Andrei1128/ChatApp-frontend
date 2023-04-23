import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
})
export class OffcanvasComponent implements OnChanges {
  @Input() profile!: any;
  showNameInput = false;
  showAboutTextarea = false;
  chat?: boolean;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if ('profile' in changes) {
      if (this.profile.participants) this.chat = true;
      else this.chat = false;
    }
  }

  editInfo(elem: string) {
    const icons = document.getElementsByClassName('Edit');
    if (elem === 'name') {
      if (this.showNameInput == false)
        icons[0].classList.replace('bi-pencil-fill', 'bi-check-lg');
      else {
        icons[0].classList.replace('bi-check-lg', 'bi-pencil-fill');
        // this.profileService
        //   .updateName(this.myProfile.name as string)
        //   .subscribe();
      }
      this.showNameInput = !this.showNameInput;
    } else {
      if (this.showAboutTextarea == false)
        icons[1].classList.replace('bi-pencil-fill', 'bi-check-lg');
      else {
        icons[1].classList.replace('bi-check-lg', 'bi-pencil-fill');
        // this.profileService
        //   .updateAbout(this.myProfile.about as string)
        //   .subscribe();
      }
      this.showAboutTextarea = !this.showAboutTextarea;
    }
  }
}
