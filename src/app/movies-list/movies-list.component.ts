import { Component, OnInit } from '@angular/core';
import { APIRequestsService } from '../apirequests.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: any;
  colsWidth: number = 1;

  constructor(private api: APIRequestsService) { }

  ngOnInit(): void {
    this.api.getMovies().subscribe((res: any) => {
      // console.log(res); 
      this.movies = res.results;
      this.movies.sort(
        (a: any, b: any) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      )
    })
  }

  getId(movieUrl: string) {
    return movieUrl.replace('https://swapi.dev/api/films/', '').replace('/', '');
  }

  handleWindowResize() {
    this.colsWidth = (window.innerWidth <= 600) ? 1 : 6;
  }

}
