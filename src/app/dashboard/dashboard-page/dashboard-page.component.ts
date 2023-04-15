import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/_core/models/chat.model';
import { AuthService } from 'src/app/_core/services/auth.service';
import { ChatShareService } from 'src/app/_core/services/chat-share.service';
import { ChatService } from 'src/app/_core/services/chat.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  lightMode = false;
  visibleSection = true;
  selectedChat!: Chat;

  constructor(
    private router: Router,
    private authService: AuthService,
    private chatShareService: ChatShareService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatShareService.selectedChat$.subscribe((chat) => {
      this.selectedChat = chat;
    });
    this.chatService.connect();
  }
  ngOnDestroy(): void {
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
        this.visibleSection = false;
      }
    } else {
      componentList[0].classList.remove('hidden');
      componentList[1].classList.remove('hidden');
      componentList[2].classList.add('hidden');
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
    this.authService.logout().subscribe({
      next: () => {
        window.sessionStorage.clear();
        this.router.navigate(['/auth']);
      },
    });
  }
}
