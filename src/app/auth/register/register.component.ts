import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      confirmPassword: [null, [Validators.required]],
    });
  }

  register() {
    this.submitted = true;
    if (this.password.value.trim() !== this.confirmPassword.value.trim())
      this.confirmPassword.setErrors({ required: true });
    if (this.registerForm.invalid) {
      return;
    }
    this.errorMessage = null;
    this.submitted = false;
    const payload = {
      name: this.username.value.trim(),
      email: this.email.value.trim(),
      password: this.password.value.trim(),
    };
    this.authService.register(payload).subscribe({
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

  passwordValidator(control: AbstractControl) {
    const password = control.value;
    const valid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(password);
    if (!valid) return { passwordInvalid: true };
    return null;
  }

  get username(): FormControl {
    return this.registerForm.get('username') as FormControl;
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
