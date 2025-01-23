import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="movie-list-container">
      <h2>Best Movies</h2>

      <!-- Display movies if available -->
      <div *ngIf="bestMovies.length > 0; else noMovies">
        <div *ngFor="let movie of bestMovies" class="movie-card">
          <img
            [src]="movie.image"
            alt="{{ movie.title }}"
            class="movie-image"
          />
          <h3>{{ movie.title }}</h3>
          <p><strong>Category:</strong> {{ movie.category }}</p>
          <!-- Display category -->
          <p><strong>Description:</strong> {{ movie.description }}</p>
          <p>
            <strong>IMDb:</strong>
            <a
              [href]="'https://www.imdb.com/title/' + movie.imdbId"
              target="_blank"
              >{{ movie.imdbId }}</a
            >
          </p>
        </div>
      </div>

      <!-- Message when no movies are available -->
      <ng-template #noMovies>
        <p>No best movies available at the moment.</p>
      </ng-template>
    </div>
  `,
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  bestMovies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getBestMovies().subscribe(
      (data: any[]) => {
        this.bestMovies = data;
      },
      (error) => {
        console.error('Error fetching best movies:', error);
      }
    );
  }
}
