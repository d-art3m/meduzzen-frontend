import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../../components/modal/modal.component';
import { CompanyEditComponent } from '../company-edit/company-edit.component';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { AuthService } from '../../../services/auth.service';
import { CompanyQuizListComponent } from '../company-quiz-list/company-quiz-list.component';

@Component({
  selector: 'app-company-profile',
  imports: [ModalComponent, CompanyEditComponent, CompanyQuizListComponent],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.scss'
})
export class CompanyProfileComponent implements OnInit {
  company: Company | null = null;
  error: string | null = null;
  loading: boolean = false;
  isOwner: boolean = false;
  isEditModalOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.companyService.getCompanyById(id).subscribe({
        next: (res: any) => {
          this.company = res.detail;
          this.authService.currentUser$.subscribe(currentUser => {
            this.isOwner = currentUser?.id === this.company?.owner?.id;
          });
          this.loading = false;
        },
        error: (err: any) => {
          this.error = err.error?.detail?.error || err.message;
          this.loading = false;
        }
      });
    }
  }

  openEditModal(): void {
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  handleCompanyUpdate(updatedCompany: Company): void {
    this.company = updatedCompany;
    this.closeEditModal();
  }
}
