import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent {
  constructor(private router: Router) {}
  toLogin() {
    this.router.navigate(['/verify']);
  }
}
