import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent implements OnInit{

  movies: any = [];
  movie: any;
  movieId: any;

  constructor(private ms: MovieService,private router: Router,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.movieId=this.route.snapshot.paramMap.get('id')!;
    this.ms.getMovieById(this.movieId).subscribe((d) => {
      this.movie = d;
    });
  }

  goBack(): void {
    this.router.navigate([`/`]);
  }



}
