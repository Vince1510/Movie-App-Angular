import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/movies'; // Your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch the best movies
  getBestMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/best`);
  }

  // Fetch movie by title
  searchMovieByTitle(title: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?title=${title}`);
  }
}
