import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [NgFor, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: User[];

  constructor(private dataService: DataService) {
    this.users = this.dataService.getUsers();
  }
}
