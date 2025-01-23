import {
  Component,
  EventEmitter, // To emit custom events from the component
  Input, // To accept data from parent component
  Output, // To emit events back to the parent component
  SimpleChanges, // For tracking changes in @Input properties
  OnChanges, // Lifecycle hook to respond to changes in input properties
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
  @Input() iframeUrl: SafeResourceUrl | null = null; // Input property to accept the URL for the iframe (movie player) from the parent
  @Input() isModalOpen: boolean = false; // Input property to control whether the modal is open or closed
  @Output() closeModalEvent = new EventEmitter<void>(); // Output event to notify the parent when the modal is closed

  // Lifecycle hook that gets triggered when input properties change
  ngOnChanges(changes: SimpleChanges): void {
    // Check if the 'isModalOpen' property has changed and if it's now true
    if (
      changes['isModalOpen'] &&
      changes['isModalOpen'].currentValue === true
    ) {
    }
  }

  // Function to close the modal and emit the closeModalEvent to notify the parent component
  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
