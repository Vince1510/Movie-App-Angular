import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail', // This component will be used with the tag <app-movie-detail>
  standalone: true, // This is a standalone component, not part of any module
  templateUrl: './movie-detail.component.html', // HTML template for the movie details view
  styleUrls: ['./movie-detail.component.css'], // CSS for styling the movie details view
})
export class MovieDetailComponent implements OnInit {
  movie: any = null; // Property to hold the movie details data

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  // ngOnInit lifecycle hook is triggered when the component is initialized
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const title = params['title'];
    });
  }
}
