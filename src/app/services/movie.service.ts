import { Injectable } from '@angular/core';
import { IMovie } from '../models/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
    movies: IMovie[] = [
        {
        id: 1,
        name: 'Jason Bourne',
        added: '2016-08-15',
        status: true
        },
        {
            id: 2,
            name: 'Alicia en el país de las Maravillas',
            added: '2016-08-15',
            status: false
        },
        {
            id: 3,
            name: 'Tarzan, La Leyenda',
            added: '2016-08-15',
            status: true
        },
        {
            id: 4,
            name: 'Mi Buen Amigo Gigante',
            added: '2016-08-15',
            status: false
        },
        {
            id: 5,
            name: 'Nada es lo que parece',
            added: '2016-08-15',
            status: true
        },
   ];
   moviesSubs: BehaviorSubject<IMovie[]>;

   constructor() {
       this.moviesSubs = new BehaviorSubject<IMovie[]>(this.movies);
   }

    getAllMovies() {
      return  this.moviesSubs.asObservable();
    }

    updateMovies(movies) {
        this.movies = movies;
        this.moviesSubs.next(this.movies);
    }

    addMovie(movie: IMovie) {
        this.movies.push(movie);
        this.updateMovies(this.movies);
    }

    editMovie(movieId: number) {
        return this.movies.filter(movie => movie.id === movieId)[0];
    }

    updateMovie(movie) {
        this.movies[movie.id - 1].name = movie.name;
        this.movies[movie.id - 1].added = movie.added;
        this.movies[movie.id - 1].status = movie.status;
        this.updateMovies(this.movies);
    }

}
