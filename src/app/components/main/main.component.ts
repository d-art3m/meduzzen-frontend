import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';
import { HealthCheckComponent } from '../health-check/health-check.component';

@Component({
  selector: 'app-main',
  imports: [HealthCheckComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(public stateService: StateService) {}

  updateTestString(newValue: string): void {
    this.stateService.updateTestString(newValue);
  }
}
