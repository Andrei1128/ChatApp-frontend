import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  lightMode: boolean = false;
  changeLightMode() {
    this.lightMode = !this.lightMode;
    if (this.lightMode) {
      document.documentElement.style.setProperty(
        '--aside-background',
        '#ffffff'
      );
      document.documentElement.style.setProperty(
        '--section-background',
        '#F3F4F9'
      );
      document.documentElement.style.setProperty(
        '--main-background',
        '#ffffff'
      );
      document.documentElement.style.setProperty('--primary-font', '#969ca5');
      document.documentElement.style.setProperty(
        '--secondary-font',
        ' #49505a'
      );
      document.documentElement.style.setProperty('--active-font', '#807bee');
      document.documentElement.style.setProperty('--active', '#e6ebf5');
    } else {
      document.documentElement.style.setProperty(
        '--aside-background',
        '#36414b'
      );
      document.documentElement.style.setProperty(
        '--section-background',
        '#313941'
      );
      document.documentElement.style.setProperty(
        '--main-background',
        '#272e34'
      );
      document.documentElement.style.setProperty('--primary-font', '#969fc0');
      document.documentElement.style.setProperty('--secondary-font', '#e1e8ef');
      document.documentElement.style.setProperty('--active-font', '#6b62d9');
      document.documentElement.style.setProperty('--active', '#3e4b57');
    }
  }
}
