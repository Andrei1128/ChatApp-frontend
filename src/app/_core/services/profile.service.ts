import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly serverUrl = `${environment.apiURL}/profile`;
  private myProfile$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) {
    this.getMyProfile().subscribe();
  }

  getMyProfile(): Observable<Profile> {
    if (!this.myProfile$.value) {
      this.httpClient
        .get(`${this.serverUrl}/myProfile`)
        .subscribe((res) => this.myProfile$.next(res));
    }
    return this.myProfile$.asObservable();
  }

  sendFriendRequest(id: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/add`, { id });
  }

  acceptFriendRequest(friendProfile: Profile): Observable<any> {
    const friendId = friendProfile._id;
    return this.httpClient
      .patch(`${this.serverUrl}/accept`, { id: friendId })
      .pipe(
        tap(() => {
          const currentProfile = this.myProfile$.value;
          currentProfile.requests = currentProfile.requests.filter(
            (req: Profile) => req._id !== friendId
          );
          currentProfile.friends.push(friendProfile);
          this.myProfile$.next(currentProfile);
        })
      );
  }

  declineFriendRequest(id: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/decline`, { id }).pipe(
      tap(() => {
        const currentProfile = this.myProfile$.value;
        currentProfile.requests = currentProfile.requests.filter(
          (req: Profile) => req._id !== id
        );
        this.myProfile$.next(currentProfile);
      })
    );
  }

  removeFriend(id: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/remove`, { id }).pipe(
      tap(() => {
        const currentProfile = this.myProfile$.value;
        currentProfile.friends = currentProfile.friends.filter(
          (frd: Profile) => frd._id !== id
        );
        this.myProfile$.next(currentProfile);
      })
    );
  }

  getFriend(id: string): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/friends/${id}`);
  }
  getFriends(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/friends`);
  }
  getPeople(nickname: string): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/peoples/${nickname}`);
  }
  getRequests(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/requests`);
  }
}
