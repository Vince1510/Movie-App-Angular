import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../safe-url.pipe'; // Import the standalone pipe

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe], // Import the pipe here
  templateUrl: './movie-search.component.html', // Reference external HTML file
  styleUrls: ['../movie-search/movie-search.component.css'],
})
export class MovieSearchComponent implements OnInit {
  searchTitle: string = '';
  movie: any = null; // Initialize movie as null
  showOverlay: boolean = false; // Toggle for the overlay

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  onSearch(): void {
    if (this.searchTitle) {
      this.movieService.searchMovieByTitle(this.searchTitle).subscribe(
        (data) => {
          if (data) {
            this.movie = data; // Store the movie data if found
          } else {
            this.movie = null; // Set movie to null if no data is found
          }
          this.showOverlay = true; // Show the overlay regardless of result
        },
        (error) => {
          console.error('Error searching movie:', error);
          this.movie = null; // Handle error by setting movie to null
          this.showOverlay = true;
        }
      );
    }
  }

  closeOverlay(event: Event): void {
    event.preventDefault();
    this.showOverlay = false; // Hide overlay on click
  }
}
