import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit{

  editForm: FormGroup;
  movieId: any;

  constructor(private movieService: MovieService,private router: Router,private f: FormBuilder,private route: ActivatedRoute){
      this.editForm=f.group({
        title: ['',Validators.required],
        director: ['',Validators.required],
        year: ['',[Validators.required,Validators.min(1900),Validators.max(new Date().getFullYear())]]
      });
    }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovieById(this.movieId).subscribe((movie) => {
      this.editForm.patchValue(movie);
    });
  }

  updateMovie(): void{
    if(this.editForm.valid){
      this.movieService.updateMovie({...this.editForm.value,id: this.movieId}).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
  

}
