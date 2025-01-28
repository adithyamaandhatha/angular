import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Movie } from './movie.model';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://bug-free-palm-tree-qxg647pvqjgf4p55-3000.app.github.dev/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]>{
   return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  createMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.apiUrl,movie);
  }

  updateMovie(movie: Movie): Observable<Movie>{
    return this.http.put<Movie>(`${this.apiUrl}/${movie.id}`,movie);
  }

  deletMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }




}
