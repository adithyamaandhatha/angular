import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { NgModel } from '@angular/forms';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{

  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchText: string='';
  sortBy: string = '';
  isAscending: boolean =  true;

  constructor(private router: Router,private movieService: MovieService){}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies=data;
      this.filteredMovies=[...this.movies];
    });
  }

  deleteMovie(id: number){
    this.movieService.deletMovie(id).subscribe(() => {
      this.movies = this.movies.filter((movie) => movie.id !== id)
      this.filteredMovies=[...this.movies];
    });
  }

  editMovie(id: number){
    this.router.navigate([`/edit/${id}`]);
  }

  viewMovie(id: number){
    this.router.navigate([`/view/${id}`]);
  }

  filterMovie(): void{
    // this.searchText=event.target.value;
    if(this.searchText){
      this.filteredMovies=this.movies.filter(
        (movie: any) => 
          movie.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          movie.director.toLowerCase().includes(this.searchText.toLowerCase())  
      );
    }
    else{
      this.filteredMovies=[...this.movies];
    }

  }

  onSort(): void{
    this.filteredMovies.sort((a: any,b: any) => {
      if(a[this.sortBy]<b[this.sortBy]){
        return this.isAscending ? -1 : 1;
      }
      else if(a[this.sortBy]>b[this.sortBy]){
        return this.isAscending ? 1 : -1;
      }
      else{
        return 0
      }
    });

  }

  sortTitle(): void{
    this.filteredMovies.sort((a: any,b: any) => {
      return a.title.localeCompare(b.title);
    });
  }

  // sortBtn(): void{
  //   this.onSort();
  // }

  onToggle(): void{
    this.isAscending=!this.isAscending;
    this.onSort();
  }

  reload(): void{
    // this.filteredMovies=[...this.movies];
    this.ngOnInit();
  }

  

}
