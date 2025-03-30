import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  signInForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.authService
        .signIn(this.signInForm.value)
        .subscribe({
          next: () => {
            this.authService.getCurrentUser();
            this.router.navigate(['/']);
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
