import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-profile',
  imports: [ModalComponent, UserEditComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  error: string | null = null;
  loading: boolean = false;
  isCurrentUser: boolean = false;
  isEditModalOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.userService.getUserById(id).subscribe({
        next: (res: any) => {
          this.user = res.detail;
          this.authService.currentUser$.subscribe((currentUser) => {
            this.isCurrentUser = currentUser?.id === res.detail.id;
          });
          this.loading = false;
        },
        error: (err: any) => {
          this.error = err.error?.detail?.error || err.message;
          this.loading = false;
        },
      });
    }
  }

  openEditModal(): void {
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  handleProfileUpdate(updatedUser: User): void {
    this.user = updatedUser;
    this.authService.setCurrentUser(updatedUser);
    this.closeEditModal();
  }
}
