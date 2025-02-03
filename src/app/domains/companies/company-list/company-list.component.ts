import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Company } from '../../../models/company.model';

@Component({
  selector: 'app-company-list',
  imports: [NgFor, RouterLink],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent {
  companies: Company[];

  constructor(private dataService: DataService) {
    this.companies = this.dataService.getCompanies();
  }
}
