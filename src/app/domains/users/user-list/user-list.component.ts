import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user.model';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink, PaginationComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  totalUsers: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  error: string = '';
  loading: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers(this.currentPage);
  }

  fetchUsers(page: number): void {
    this.loading = true;
    this.userService.getUsers(page, this.limit).subscribe({
      next: (res: any) => {
        this.users = res.detail.items;
        this.totalUsers = res.detail.total;
        this.currentPage = page;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.error?.detail?.error || err.message;
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.fetchUsers(page);
  }
}
