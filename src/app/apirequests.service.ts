import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIRequestsService {
  private baseUrl = 'https://swapi.dev/api/';
  constructor(
    private httpClient: HttpClient
  ) { }

  getMovies() {
    return this.httpClient.get(this.baseUrl + 'films/')
  }

  getMovie(movieId: number | string) {
    return this.httpClient.get(this.baseUrl + 'films/' + movieId + '/')
  }

  getCharacter(characterUrl: string) {
    return this.httpClient.get(characterUrl)
  }

  getPlanet(planetUrl: string) {
    return this.httpClient.get(planetUrl)
  }

  getStarship(starshipUrl: string) {
    return this.httpClient.get(starshipUrl)
  }
}
