import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NavbarComponent, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user: Partial<User> | null = null;

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

  logout(): void {
    this.authService.logout();
  }
}
