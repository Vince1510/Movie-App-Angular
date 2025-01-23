import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service'; // Service to fetch movie data
import { CommonModule } from '@angular/common'; // Common Angular module for common directives

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  // Variable to store an array of the best movies fetched from the service
  bestMovies: any[] = [];

  // Inject the MovieService to fetch movie data
  constructor(private movieService: MovieService) {}

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(): void {
    // Fetch the best movies from the MovieService
    this.movieService.getBestMovies().subscribe(
      // Success callback: update the bestMovies array with fetched data
      (data: any[]) => {
        this.bestMovies = data;
      },
      // Error callback: log the error in case of failure
      (error) => {
        console.error('Error fetching best movies:', error);
      }
    );
  }
}
