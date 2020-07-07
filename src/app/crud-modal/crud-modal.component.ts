import { AfterViewInit, Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { throwError, of } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { catchError, finalize } from 'rxjs/operators';
import { IMovie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-crud-modal',
  templateUrl: './crud-modal.component.html',
  styleUrls: ['./crud-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudModalComponent implements OnInit {
  movie: IMovie;
  id: number;
  title: string;
  movies: IMovie[];
  index: number;
  movieForm = new FormGroup({
    name: new FormControl(),
    added: new FormControl(''),
    status: new FormControl('')
  });

  constructor(private modalService: NgbModal,
              private moviesService: MovieService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.id) {
      this.open(this.id);
    } else {
      this.moviesService.getAllMovies().subscribe(movies => {
        this.movies = movies;
        this.index = this.movies.length;
      });
    }
  }

  open(id) {
    this.movie = this.moviesService.editMovie(id);
    // this.movie.added = new Date(this.movie.added);
    this.movieForm.controls.added.setValue(this.movie.added);
    this.movieForm.controls.added.setValue(this.movie.name);
    this.movieForm.controls.added.setValue(this.movie.status);
    this.cd.markForCheck();
  }

  close() {
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';

    } else {
      return  `with: ${reason}`;
    }
  }


  onSubmit() {
    console.log(this.movieForm.value);
    if (this.id) {
      this.movie = {
        id : this.id,
        name: this.movieForm.value.name,
        added: this.movieForm.value.added,
        status: this.movieForm.value.status
      };
      this.moviesService.updateMovie(this.movie);
    } else {
      this.movie = {
        id : this.index + 1,
        name: this.movieForm.value.name,
        added: this.movieForm.value.added,
        status: this.movieForm.value.status
      };
      this.moviesService.addMovie(this.movie);
    }
    this.close();
  }

}
