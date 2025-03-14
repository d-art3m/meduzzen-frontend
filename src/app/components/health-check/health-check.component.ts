import { Component, OnInit } from '@angular/core';
import { HealthCheckResponse } from '../../types/health-check.types';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-health-check',
  imports: [],
  templateUrl: './health-check.component.html',
  styleUrl: './health-check.component.scss'
})
export class HealthCheckComponent implements OnInit {
  healthCheck: HealthCheckResponse| null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.loading = true;
    this.httpService.checkHealth().subscribe({
      next: (data) => {
        this.healthCheck = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
}