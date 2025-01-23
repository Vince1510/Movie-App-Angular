import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { movieTitles } from './movie-titles';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CarouselComponent implements OnInit {
  movies: any[] = [];
  isModalOpen: boolean = false;
  selectedImdbId: string = '';
  iframeUrl: SafeResourceUrl | null = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    movieTitles.forEach((title) => {
      this.http
        .get<any>(`http://localhost:3000/movies/search?title=${title}`)
        .subscribe((response) => {
          this.movies.push({
            title: response.title,
            description: response.description,
            image: response.image,
            imdbId: response.imdbId,
            category: response.category,
          });
        });
    });
  }

  onMovieClick(imdbId: string): void {
    this.selectedImdbId = imdbId;
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://vidsrc.me/embed/movie?imdb=${imdbId}`
    );
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.iframeUrl = null;
  }
}
