import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Profile } from 'src/app/_core/models/profile.model';
import { DataShareService } from 'src/app/_core/services/data-share.service';
import { ProfileService } from 'src/app/_core/services/profile.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  peoples: Profile[] = [];
  searchPeoplesForm = new FormControl();

  constructor(
    private profileService: ProfileService,
    private dataShareService: DataShareService
  ) {}

  searchPeoples() {
    this.profileService
      .getPeople(this.searchPeoplesForm.value)
      .subscribe((res) => (this.peoples = res));
  }

  sendFriendRequest(id?: string) {
    this.profileService.sendFriendRequest(id as string).subscribe(() => {
      this.peoples = this.peoples.filter((ppl) => ppl._id != id);
    });
  }
  viewProfile(id?: string) {
    this.dataShareService.shareProfile(id as string, false);
  }
}
