import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user.model';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [NgFor, RouterLink, PaginationComponent, NgIf],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  totalUsers: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  error: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers(this.currentPage);
  }

  fetchUsers(page: number): void {
    this.userService.getUsers(page, this.limit).subscribe({
      next: (res: any) => {
        this.users = res.detail.items;
        this.totalUsers = res.detail.total;
        this.currentPage = page;
      },
      error: (err: any) => {
        this.error = err.error?.detail?.error || err.message;
      }
    });
  }

  onPageChange(page: number): void {
    this.fetchUsers(page);
  }
}
