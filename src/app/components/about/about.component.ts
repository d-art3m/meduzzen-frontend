import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { HealthCheckComponent } from '../health-check/health-check.component';

@Component({
  selector: 'app-about',
  imports: [ModalComponent, HealthCheckComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
