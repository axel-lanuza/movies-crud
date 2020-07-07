import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IMovie } from './models/movie';
import { MovieService } from './services/movie.service';
import { NgbModal, ModalDismissReasons, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { CrudModalComponent } from './crud-modal/crud-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'movies-crud';
  asideManuItems = [
    'Dasboard',
    'Peliculas',
    'Turnos',
    'Administradores',
    'Perfil',
    'Cerrar Sesión'
  ];
  movies: IMovie[];

  constructor(private moviesService: MovieService,
              private cd: ChangeDetectorRef,
              private modalService: NgbModal
    ) {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.moviesService.getAllMovies().subscribe(movies => {
      if (movies) {
        this.movies = movies;
        this.cd.markForCheck();
      }
    });
  }

  deleteMovie(movieId: number) {
    this.movies = this.movies.filter((movie, index) => movie.id !== movieId);
    this.movies.forEach((movie, index) => {
      movie.id = index + 1;
    });
    this.cd.markForCheck();
  }

  editMovie(moveiId: number) {
    const modal = this.modalService.open(CrudModalComponent, {
        windowClass: 'crud-movie-popup',
        backdropClass: 'crud-movie-popup-backdrop',
        size: 'lg',
        centered: true,
        scrollable: true,
        backdrop: true,
        keyboard: false
      }
    );

    modal.componentInstance.id = moveiId;
    modal.componentInstance.title = 'Editar Pelicula';
  }

  newMovie() {
    const modal = this.modalService.open(CrudModalComponent, {
      windowClass: 'crud-movie-popup',
      backdropClass: 'crud-movie-popup-backdrop',
      size: 'lg',
      centered: true,
      scrollable: true,
      backdrop: true,
      keyboard: false
    }
  );

    modal.componentInstance.title = 'Nueva Pelicula';
  }
}
