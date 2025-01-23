import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../safe-url.pipe'; // Import the standalone pipe

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe], // Import the pipe here
  template: `
    <div class="movie-search-container">
      <h2>Search for a Movie</h2>

      <form (ngSubmit)="onSearch()" #searchForm="ngForm">
        <label for="title">Movie Title:</label>
        <input
          type="text"
          id="title"
          [(ngModel)]="searchTitle"
          name="title"
          required
          #title="ngModel"
        />
        <button type="submit" [disabled]="!searchTitle || title.invalid">
          Search
        </button>
      </form>

      <!-- Movie details overlay -->
      <div class="overlay" *ngIf="showOverlay" (click)="closeOverlay($event)">
        <div class="overlay-content" (click)="$event.stopPropagation()">
          <div *ngIf="movie; else noMovieFound">
            <h3>{{ movie.title }}</h3>
            <p><strong>Description:</strong> {{ movie.description }}</p>
            <p><strong>Category:</strong> {{ movie.category }}</p>
            <p>
              <strong>IMDb:</strong>
              <a
                [href]="'https://www.imdb.com/title/' + movie.imdbId"
                target="_blank"
                >{{ movie.imdbId }}</a
              >
            </p>
            <button class="close-btn" (click)="closeOverlay($event)">×</button>

            <!-- Use the SafeUrlPipe to sanitize the iframe URL -->
            <iframe
              *ngIf="movie?.imdbId"
              [src]="
                'https://vidsrc.net/embed/movie?imdb=' + movie.imdbId | safeUrl
              "
              style="width: 100%; height: 300px;"
              frameborder="0"
              referrerpolicy="origin"
              allowfullscreen
            ></iframe>
          </div>

          <ng-template #noMovieFound>
            <p>No movie found with the title "{{ searchTitle }}".</p>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../movie-search/movie-search.component.css'],
})
export class MovieSearchComponent implements OnInit {
  searchTitle: string = '';
  movie: any;
  showOverlay: boolean = false; // Toggle for the overlay

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  onSearch(): void {
    if (this.searchTitle) {
      this.movieService.searchMovieByTitle(this.searchTitle).subscribe(
        (data) => {
          this.movie = data;
          this.showOverlay = true; // Show the overlay when movie data is found
        },
        (error) => {
          console.error('Error searching movie:', error);
        }
      );
    }
  }

  closeOverlay(event: Event): void {
    event.preventDefault();
    this.showOverlay = false; // Hide overlay on click
  }
}
