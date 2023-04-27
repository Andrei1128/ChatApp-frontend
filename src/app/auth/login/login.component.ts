import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          //  Validators.email
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          // Validators.minLength(8)
        ],
      ],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Enter valid data!';
      return;
    }
    this.errorMessage = null;
    const payload = {
      email: this.email.value.trim(),
      password: this.password.value.trim(),
    };
    this.authService.login(payload).subscribe({
      next: (res) => {
        window.sessionStorage['token'] = res;
        this.router.navigate(['']);
      },
      error: (e: any) => {
        if (typeof e.error === 'string') this.errorMessage = e.error;
        else this.errorMessage = 'Lost server connection!';
      },
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
