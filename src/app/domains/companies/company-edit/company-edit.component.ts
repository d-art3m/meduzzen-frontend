import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Company, CompanyVisibility } from '../../../models/company.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent {
  @Input() company!: Company;
  @Output() update = new EventEmitter<Company>();
  @Output() cancel = new EventEmitter<void>();
  @Output() deleteCompany = new EventEmitter<void>();

  companyForm: FormGroup;
  error: string | null = null;

  public CompanyVisibility = CompanyVisibility;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      visibility: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.companyForm.patchValue({
      name: this.company.name,
      description: this.company.description,
      visibility: this.company.visibility,
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const data = this.companyForm.getRawValue();

      this.companyService.updateCompany(this.company.id, data).subscribe({
        next: (res: any) => {
          this.update.emit(res.detail);
        },
        error: (err) => {
          this.error = err.error?.detail?.error || err.message;
        },
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onDelete(): void {
    if (
      confirm(
        'Are you sure you want to delete this company? This action cannot be undone.'
      )
    ) {
      this.companyService.deleteCompany(this.company.id).subscribe({
        next: () => {
          this.deleteCompany.emit();
          this.router.navigate(['/companies']);
        },
        error: (err) => {
          this.error = err.error?.detail?.error || err.message;
        },
      });
    }
  }
}
