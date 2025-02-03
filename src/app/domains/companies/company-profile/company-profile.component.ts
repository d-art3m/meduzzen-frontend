import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-company-profile',
  imports: [],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.scss'
})
export class CompanyProfileComponent {
  name: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const company = this.dataService.getCompanyById(id);
    this.name = company?.name || '';
  }
}
