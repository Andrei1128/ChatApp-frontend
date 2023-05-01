import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/_core/models/chat.model';
import { AuthService } from 'src/app/_core/services/auth.service';
import { DataShareService } from 'src/app/_core/services/data-share.service';
import { ChatService } from 'src/app/_core/services/chat.service';
import { Profile } from 'src/app/_core/models/profile.model';
import { ProfileService } from 'src/app/_core/services/profile.service';
import { Subscription } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Message } from 'src/app/_core/models/message.model';
declare var bootstrap: any;

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  lightMode = false;
  loaded = false;
  visibleSection = true;
  selectedChat!: Chat;
  selectedProfile!: Profile;
  myProfileImage?: string;
  myProfileId: string;
  chat: Chat;
  activeChatId: string;
  private selectedProfileSubscription!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataShareService: DataShareService,
    private chatService: ChatService,
    private profileService: ProfileService,
    private socket: Socket
  ) {}

  ngOnInit(): void {
    this.dataShareService;
    this.socket.on('incoming video call', (convId: string) => {
      this.chat = this.profileService.myProfile$.value.chats.find(
        (chat) => chat._id === convId
      );
      var myModal = document.getElementById('answearvideoModal');
      var modal = new bootstrap.Modal(myModal);
      modal.show();
      const currentProfile = this.profileService.myProfile$.value;
      let targetChatIndex = currentProfile.chats.findIndex(
        (chat) => chat._id === this.chat._id
      );
      if (targetChatIndex !== -1) {
        let message = {
          content: 'Started a video call',
          createdAt: new Date(),
        };
        currentProfile.chats[targetChatIndex].messages.push(message as Message);
        if (
          currentProfile.chats[targetChatIndex]._id !== this.selectedChat?._id
        )
          currentProfile.chats[targetChatIndex].notifications++;
        const targetChat = currentProfile.chats.splice(targetChatIndex, 1)[0];
        currentProfile.chats.push(targetChat);
        this.profileService.myProfile$.next(currentProfile);
      }
    });
    this.socket.on('incoming audio call', (convId: string) => {
      this.chat = this.profileService.myProfile$.value.chats.find(
        (chat) => chat._id === convId
      );
      var myModal = document.getElementById('answearaudioModal');
      var modal = new bootstrap.Modal(myModal);
      modal.show();
      const currentProfile = this.profileService.myProfile$.value;
      let targetChatIndex = currentProfile.chats.findIndex(
        (chat) => chat._id === this.chat._id
      );
      if (targetChatIndex !== -1) {
        let message = {
          content: 'Started a audio call',
          createdAt: new Date(),
        };
        currentProfile.chats[targetChatIndex].messages.push(message as Message);
        if (
          currentProfile.chats[targetChatIndex]._id !== this.selectedChat?._id
        )
          currentProfile.chats[targetChatIndex].notifications++;
        const targetChat = currentProfile.chats.splice(targetChatIndex, 1)[0];
        currentProfile.chats.push(targetChat);
        this.profileService.myProfile$.next(currentProfile);
      }
    });

    this.profileService.getMyProfile().subscribe((res) => {
      this.myProfileId = res._id;
      this.myProfileImage = res.image;
      if (this.myProfileImage) this.loaded = true;
    });

    this.dataShareService.selectedChat$.subscribe((chat) => {
      if (chat) this.selectedChat = chat;
      else {
        if (this.selectedChat) this.selectedChat._id = undefined;
      }
      if (this.selectedChat?._id && window.innerWidth < 991) {
        const componentList = document.querySelectorAll('.target');
        componentList[0].classList.add('hidden');
        componentList[1].classList.add('hidden');
        componentList[2].classList.remove('hidden');
        if (componentList[3]) componentList[3].classList.remove('hidden');
        this.visibleSection = false;
      }
    });

    this.selectedProfileSubscription =
      this.dataShareService.selectedProfile$.subscribe((profile: Profile) => {
        this.selectedProfile = profile;
        if (this.selectedProfile.name) {
          var myOffcanvas = document.getElementById('offcanvasExample');
          var offcanvas = new bootstrap.Offcanvas(myOffcanvas);
          offcanvas.show();
        }
      });
    this.chatService.connect();
  }

  enterVideoCall() {
    this.dataShareService.shareChat(this.chat);
  }
  enterAudioCall() {
    this.dataShareService.shareChat(this.chat);
  }

  closeChat() {
    const componentList = document.querySelectorAll('.target');
    componentList[0].classList.remove('hidden');
    componentList[1].classList.remove('hidden');
    componentList[2].classList.add('hidden');
    if (componentList[3]) componentList[3].classList.add('hidden');
    this.visibleSection = true;
  }

  ngOnDestroy(): void {
    this.selectedProfileSubscription.unsubscribe();
    this.chatService.disconnect();
  }

  changeSectionVisibility(event: MouseEvent) {
    const link = (event.target as HTMLAnchorElement).getAttribute('routerLink');
    const currentLink = this.router.url;
    const componentList = document.querySelectorAll('.target');
    if (this.visibleSection) {
      if (link === currentLink) {
        componentList[0].classList.add('hidden');
        componentList[1].classList.add('hidden');
        componentList[2].classList.remove('hidden');
        if (componentList[3]) componentList[3].classList.remove('hidden');
        this.visibleSection = false;
      }
    } else {
      componentList[0].classList.remove('hidden');
      componentList[1].classList.remove('hidden');
      componentList[2].classList.add('hidden');
      if (componentList[3]) componentList[3].classList.add('hidden');
      this.visibleSection = true;
    }
  }

  changeLightMode() {
    this.lightMode = !this.lightMode;
    if (this.lightMode) {
      this.setColor('--aside-background', '#F9f9f9');
      this.setColor('--section-background', '#Edf1f1');
      this.setColor('--main-background', '#ffffff');
      this.setColor('--primary-font', '#797d83');
      this.setColor('--secondary-font', ' #49505a');
      this.setColor('--active-font', '#807bee');
      this.setColor('--active', '#e6ebf5');
      this.setColor('--dropdown', '#fffefe');
      this.setColor('--modal-background', '#F1F1F7');
      this.setColor('--modal-input', '#fffefe');
    } else {
      this.setColor('--aside-background', '#36414b');
      this.setColor('--section-background', '#313941');
      this.setColor('--main-background', '#272e34');
      this.setColor('--primary-font', '#969fc0');
      this.setColor('--secondary-font', '#e1e8ef');
      this.setColor('--active-font', '#6b62d9');
      this.setColor('--active', '#3e4b57');
      this.setColor('--dropdown', '#313a43');
      this.setColor('--modal-background', '#262d3b');
      this.setColor('--modal-input', '#2d3244');
    }
  }
  setColor(element: string, color: string) {
    document.documentElement.style.setProperty(element, color);
  }
  logout() {
    this.authService.logout().subscribe(() => {
      this.profileService.clearProfile();
      this.dataShareService.clearData();
      window.sessionStorage.clear();
      this.router.navigate(['/auth']);
    });
  }
}
