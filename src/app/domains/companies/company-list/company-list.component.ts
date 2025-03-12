import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Company, CompanyType } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-company-list',
  imports: [
    NgFor,
    RouterLink,
    PaginationComponent,
    NgIf,
    CompanyCreateComponent,
    ModalComponent,
  ],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  totalCompanies: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  error: string = '';

  selectedTab: CompanyType = CompanyType.Public;
  isCreateModalOpen: boolean = false;

  public CompanyType = CompanyType;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService
      .getCompanies(this.selectedTab, this.currentPage, this.limit)
      .subscribe({
        next: (res: any) => {
          this.companies = res.detail.items;
          this.totalCompanies = res.detail.total;
        },
        error: (err: any) => {
          this.error = err.error?.detail?.error || err.message;
        },
      });
  }

  onTabChange(type: CompanyType) {
    this.selectedTab = type;
    this.currentPage = 1;
    this.loadCompanies();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCompanies();
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
  }

  handleCompanyCreated(newCompany: Company): void {
    this.companies.push(newCompany);
    this.closeCreateModal();
  }
}
