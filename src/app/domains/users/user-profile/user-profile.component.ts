import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  name: string = '';

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const user = this.dataService.getUserById(id);
      this.name = user?.name || '';
    }
  }
}
