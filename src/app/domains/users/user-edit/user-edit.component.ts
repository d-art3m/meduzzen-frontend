import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../models/user.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent implements OnInit {
  @Input() user!: User;
  @Output() update = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();
  @Output() deleteProfile = new EventEmitter<void>();

  userForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [{ value: '', disabled: true }],
      password: ['', [Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue({
      name: this.user.name,
      email: this.user.email,
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const { name, password } = this.userForm.getRawValue();
      const data = password ? { name, auth: { password } } : { name };
      this.userService.updateUser(data).subscribe({
        next: (res: any) => {
          this.update.emit(res.detail);
        },
        error: (err) => {
          this.error = err.error?.detail?.error || err.message;
        },
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onDelete(): void {
    if (
      confirm(
        'Are you sure you want to delete your profile? This action cannot be undone.'
      )
    ) {
      this.userService.deleteUser().subscribe({
        next: () => {
          this.deleteProfile.emit();
          this.authService.logout();
        },
        error: (err) => {
          this.error = err.error?.detail?.error || err.message;
        },
      });
    }
  }
}
