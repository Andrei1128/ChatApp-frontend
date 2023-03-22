import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nickname: [null],
      email: [null],
      password: [null],
      confirmPassword: [null],
    });
  }
  register() {
    const payload = {
      nickname: this.nickname.value,
      email: this.email.value,
      password: this.password.value,
    };
    this.authService.register(payload).subscribe({
      next: (res) => {
        window.localStorage['token'] = res;
        this.router.navigate(['']);
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }
  get nickname(): FormControl {
    return this.registerForm.get('nickname') as FormControl;
  }
  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get confirmPassword(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
}
