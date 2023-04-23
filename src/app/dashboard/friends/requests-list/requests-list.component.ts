import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Profile } from 'src/app/_core/models/profile.model';
import { DataShareService } from 'src/app/_core/services/data-share.service';
import { ProfileService } from 'src/app/_core/services/profile.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['../friends.component.scss'],
})
export class RequestsListComponent implements OnInit {
  requests: Profile[] = [];
  searchRequestsForm = new FormControl();

  constructor(
    private profileService: ProfileService,
    private dataShareService: DataShareService
  ) {}

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe((res) => {
      if (res.requests) this.requests = res.requests;
    });
  }

  acceptFriendRequest(friendProfile: Profile) {
    this.profileService.acceptFriendRequest(friendProfile).subscribe();
  }

  declineFriendRequest(id?: string) {
    this.profileService.declineFriendRequest(id as string).subscribe();
  }

  search() {
    this.profileService.getMyProfile().subscribe((res) => {
      if (res.requests) {
        const searchTerm = this.searchRequestsForm.value.toLowerCase();
        this.requests = res.requests.filter(
          (req) => req.name && req.name.toLowerCase().includes(searchTerm)
        );
      }
    });
  }
  viewProfile(id?: string) {
    this.dataShareService.shareProfile(id as string, false);
  }
}
