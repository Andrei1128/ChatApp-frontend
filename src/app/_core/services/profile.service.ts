import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile.model';
import { Socket } from 'ngx-socket-io';
import { Message } from '../models/message.model';
import { Chat, UserUtil } from '../models/chat.model';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly serverUrl = `${environment.apiURL}/profile`;
  public myProfile$: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(
    new Profile()
  );

  constructor(private httpClient: HttpClient, private socket: Socket) {
    this.socket.on('new friend', (friend: Profile) => {
      this.myProfile$.value.friends?.push(friend);
    });

    this.socket.on('new request', (request: Profile) => {
      this.myProfile$.value.requests?.push(request);
    });

    this.socket.on('rem friend', (friendId: string) => {
      const currentProfile = this.myProfile$.value;
      currentProfile.friends = currentProfile.friends?.filter(
        (frd: Profile) => frd._id !== friendId
      );
      this.myProfile$.next(currentProfile);
    });

    this.socket.on('new chat', (res: any) => {
      this.myProfile$.value.chats.push(res);
    });

    this.socket.on('new friend about', (res: any) => {
      const currentProfile = this.myProfile$.value;
      currentProfile.friends = currentProfile.friends.map((friend) => {
        if (friend._id === res.id) {
          friend.about = res.about;
        }
        return friend;
      });
      this.myProfile$.next(currentProfile);
    });

    this.socket.on('user connected', (userID: string) => {
      this.updateStatus(userID, true);
    });

    this.socket.on('user disconnected', (userID: string) => {
      this.updateStatus(userID, false);
    });
  }

  updateStatus(id: string, online: boolean) {
    const currentProfile = this.myProfile$.value;
    currentProfile.friends = currentProfile.friends?.map((friend) => {
      if (friend._id === id) {
        friend.online = online;
      }
      return friend;
    });
    this.myProfile$.next(currentProfile);
  }

  clearProfile() {
    this.myProfile$.next(new Profile());
  }

  addProject(project: Project) {
    const currentProfile = this.myProfile$.value;
    currentProfile.projects.push(project);
    this.myProfile$.next(currentProfile);
  }

  getMyProfile(): Observable<Profile> {
    if (!this.myProfile$.value._id) {
      this.httpClient
        .get(`${this.serverUrl}/myProfile`)
        .subscribe((res: Profile) => {
          const profile = res;
          profile.chats.forEach((chat: Chat) => {
            chat.userUtil.forEach((userUtil: UserUtil) => {
              if (userUtil.userId === profile._id) {
                chat.notifications = userUtil.notifications;
              }
            });
          });

          this.myProfile$.next(profile);
        });
    }
    return this.myProfile$.asObservable();
  }

  updateImage(image: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/updateImage`, {
      image,
    });
  }

  updateName(content: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/updateName`, {
      name: content,
    });
  }

  updateAbout(content: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/updateAbout`, {
      about: content,
    });
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
          currentProfile.requests = currentProfile.requests?.filter(
            (req: Profile) => req._id !== friendId
          );
          currentProfile.friends?.push(friendProfile);
          this.myProfile$.next(currentProfile);
        })
      );
  }

  declineFriendRequest(id: string): Observable<any> {
    return this.httpClient.patch(`${this.serverUrl}/decline`, { id }).pipe(
      tap(() => {
        const currentProfile = this.myProfile$.value;
        currentProfile.requests = currentProfile.requests?.filter(
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
        currentProfile.friends = currentProfile.friends?.filter(
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
