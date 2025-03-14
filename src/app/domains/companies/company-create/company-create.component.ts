import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { CompanyVisibility } from '../../../models/company.model';

@Component({
  selector: 'app-company-create',
  imports: [ReactiveFormsModule],
  templateUrl: './company-create.component.html',
  styleUrl: './company-create.component.scss',
})
export class CompanyCreateComponent {
  @Output() companyCreated = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  companyForm: FormGroup;
  error: string | null = null;

  public CompanyVisibility = CompanyVisibility;

  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      visibility: [CompanyVisibility.PUBLIC, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      this.companyService.createCompany(this.companyForm.value).subscribe({
        next: (res: any) => {
          this.companyCreated.emit(res.detail);
        },
        error: (err: any) => {
          this.error = err.error?.detail?.error || err.message;
        },
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
