import { Component } from '@angular/core';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieService } from './movie.service';
import { CarouselComponent } from './carousel/carousel.component';
import { ModalComponent } from './modal/modal.component'; // Import the modal component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MovieListComponent,
    MovieSearchComponent,
    CarouselComponent,
    ModalComponent,
  ], // Add ModalComponent here
  template: `
    <div class="card-container">
      <div class="card">
        <app-movie-search></app-movie-search>
        <app-movie-list></app-movie-list>
      </div>
      <app-carousel></app-carousel>
    </div>
    <app-modal [isModalOpen]="isModalOpen" [iframeUrl]="iframeUrl"></app-modal>
    <!-- Modal component -->
  `,
  styleUrls: ['./app.component.css'],
  providers: [MovieService],
})
export class AppComponent {
  title = 'movie-app';
  isModalOpen = false; // Control modal visibility
  iframeUrl: string | null = null; // URL for the iframe

  constructor(private movieService: MovieService) {}

  openModal(url: string) {
    this.isModalOpen = true;
    this.iframeUrl = url;
  }

  closeModal() {
    this.isModalOpen = false;
    this.iframeUrl = null;
  }
}
