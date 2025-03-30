import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpForm: FormGroup;
  errorMessage: string = '';

  private emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
        login: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const pass = control.get('password')?.value;
    const confirmPass = control.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const { name, email, login, password } = this.signUpForm.value;
      this.authService
        .signUp({ name, email, auth: { login, password } })
        .subscribe({
          next: () => {
            this.router.navigate(['/auth/signin']);
          },
          error: (err: any) => {
            this.errorMessage = err.error?.detail?.error || 'Internal Server Error';
          },
        });
    }
  }

  loginWithAuth0(): void {
    this.authService.loginWithAuth0();
  }
}
