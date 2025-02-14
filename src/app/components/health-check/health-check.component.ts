import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { HealthCheckResponse } from '../../types/health-check.types';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-health-check',
  imports: [NgIf],
  templateUrl: './health-check.component.html',
  styleUrl: './health-check.component.scss'
})
export class HealthCheckComponent implements OnInit {
  healthCheck: HealthCheckResponse| null = null;
  error: string | null = null;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.checkHealth().subscribe({
      next: (data) => {
        this.healthCheck = data;
      },
      error: (err) => {
        this.error = err.message;
      },
    });
  }
}