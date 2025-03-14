import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { ModalComponent } from '../modal/modal.component';
import { UserEditComponent } from '../../domains/users/user-edit/user-edit.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NavbarComponent, ModalComponent, UserEditComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  isEditModalOpen: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });

    this.authService.handleAuth0Token();
    
    if (!this.user && this.authService.isAuthenticated()) {
      this.authService.getCurrentUser();
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

  logout(): void {
    this.authService.logout();
  }
}
