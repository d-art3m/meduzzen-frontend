import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() title: string = 'Info';
  @Input() showModal: boolean = false;

  @Output() close = new EventEmitter<void>();
  onClose() {
    this.close.emit();
  }
}