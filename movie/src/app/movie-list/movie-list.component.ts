import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{

  movies: any = [];

  constructor(private router: Router,private movieService: MovieService){}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies=data;
    });
  }

  deleteMovie(id: number){
    this.movieService.deletMovie(id).subscribe(() => {
      this.movies = this.movies.filter((movie:any) => movie.id !== id)
    });
  }

  editMovie(id: number){
    this.router.navigate([`/edit/${id}`]);
  }

  

}
