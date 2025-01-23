import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnChanges {
  @Input() iframeUrl: SafeResourceUrl | null = null;
  @Input() isModalOpen: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isModalOpen'] &&
      changes['isModalOpen'].currentValue === true
    ) {
      console.log('Modal opened');
    }
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
