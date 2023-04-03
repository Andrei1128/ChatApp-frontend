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
      this.setColor('--aside-background', '#ffffff');
      this.setColor('--section-background', '#F3F4F9');
      this.setColor('--main-background', '#ffffff');
      this.setColor('--primary-font', '#797d83');
      this.setColor('--secondary-font', ' #49505a');
      this.setColor('--active-font', '#807bee');
      this.setColor('--active', '#e6ebf5');
      this.setColor('--dropdown', '#fffefe');
      this.setColor('--modal-background', '#e8e8ec');
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
}
