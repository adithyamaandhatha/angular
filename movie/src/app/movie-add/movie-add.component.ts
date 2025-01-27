import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent {
  movieForm: FormGroup;
  constructor(private movieService: MovieService,private router: Router,private f: FormBuilder){
    this.movieForm=f.group({
      title: ['',Validators.required],
      director: ['',Validators.required],
      year: ['',[Validators.required,Validators.min(1900),Validators.max(new Date().getFullYear())]]
    });
  }

  addMovie(): void{
    if(this.movieForm.valid){
      this.movieService.createMovie(this.movieForm.value).subscribe(() => {
        this.router.navigate([`/`]);
      });
    }
  }

}
