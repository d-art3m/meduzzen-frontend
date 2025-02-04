import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(public stateService: StateService) {}

  updateTestString(newValue: string): void {
    this.stateService.updateTestString(newValue);
  }
}
