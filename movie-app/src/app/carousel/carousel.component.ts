import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { movieTitles } from './movie-titles'; // Array containing the movie titles to search for
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // To safely embed external URLs (for iframe)
import { forkJoin, of } from 'rxjs'; // forkJoin to handle multiple requests in parallel, 'of' to handle errors
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-carousel', // This component will be used with the tag <app-carousel>
  templateUrl: './carousel.component.html', // HTML template for the carousel
  styleUrls: ['./carousel.component.css'], // CSS for styling the carousel
  standalone: true, // This component is a standalone Angular component
  imports: [CommonModule], // Importing CommonModule for Angular's common directives
})
export class CarouselComponent implements OnInit {
  movies: any[] = [];
  isModalOpen: boolean = false;
  selectedImdbId: string = '';
  iframeUrl: SafeResourceUrl | null = null;
  noMoviesFound: boolean = false;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // If the movieTitles array is empty, set noMoviesFound to true and stop further execution
    if (movieTitles.length === 0) {
      this.noMoviesFound = true;
      return;
    }

    // Create an array of HTTP requests for each movie title
    const movieRequests = movieTitles.map((title) =>
      this.http
        .get<any>(`http://localhost:3000/movies/search?title=${title}`)
        .pipe(catchError((error) => of(null)))
    );

    // Make all the API calls in parallel using forkJoin
    forkJoin(movieRequests).subscribe(
      (responses) => {
        // Filter out failed responses (null) and movies without a valid IMDb ID
        this.movies = responses
          .filter((response) => response && response.imdbId)
          .map((response) => ({
            //Store all data
            title: response.title,
            description: response.description,
            image: response.image,
            imdbId: response.imdbId,
            category: response.category,
          }));

        // If no valid movies were found, set noMoviesFound to true
        if (this.movies.length === 0) {
          this.noMoviesFound = true;
        }
      },
      (error) => {
        // Handle global error in case all requests fail
        console.error('Error fetching movies:', error);
        this.noMoviesFound = true; // Set flag to show "No movies found" message
      }
    );
  }

  // Function to handle clicking on a movie
  onMovieClick(imdbId: string): void {
    this.selectedImdbId = imdbId; // Store the IMDb ID of the clicked movie

    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://vidsrc.me/embed/movie?imdb=${imdbId}`
    );
    this.isModalOpen = true;
  }

  // Function to close the modal window
  closeModal(): void {
    this.isModalOpen = false;
    this.iframeUrl = null;
  }
}
