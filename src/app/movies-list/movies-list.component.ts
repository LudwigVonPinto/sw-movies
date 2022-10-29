import { Component, OnInit } from '@angular/core';
import { APIRequestsService } from '../apirequests.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: any;
  colsWidth: number = 6;
  loading = true;

  constructor(private api: APIRequestsService) { }

  ngOnInit(): void {
    // Inicialmente se solicitan todas las películas disponibles en la API, para ser mostradas por html
    this.api.getMovies().subscribe((res: any) => {
      this.movies = res.results;
      this.movies.sort(
        // Se ordenan los resultados por fecha de estreno ascendente
        // En teoría no debería ser necesario, pues la API ya las regresa en ese orden
        (a: any, b: any) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      )
      this.loading = false;
    })
    // Acomoda el ancho de las columnas de los cards
    this.handleWindowResize();
  }

  getId(movieUrl: string) {
    return movieUrl.replace('https://swapi.dev/api/films/', '').replace('/', '');
  }

  getYearOnly(release_date: string) {
    const date = new Date(release_date)
    return date.getFullYear()
  }

  getCustomDate(release_date: string) {
    const date = new Date(release_date)
    // tiene que ser UTC para que no cambie el día
    return new Intl.DateTimeFormat('es-MX', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'}).format(date) // 10 de mayo de 1977
  }

  handleWindowResize() {
    this.colsWidth = (window.innerWidth <= 600) ? 1 : 6;
  }

}
