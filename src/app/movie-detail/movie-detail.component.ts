import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIRequestsService } from '../apirequests.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  data: any;
  starships: {name: string, model: string, starship_class: string, cost_in_credits: string, length: string, crew: string, passengers: string}[] = [];
  characters: {name: string, gender: string, birth_year: string, height: string, mass: string}[] = [];
  planets: {name: string, climate: string, population: string, terrain: string, rotation_period: string, orbital_period: string}[] = [];
  colsWidth : number = 1;
  error = false;
  constructor(private api: APIRequestsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.api.getMovie(id).subscribe((res: any) => {
      this.data = res
      this.fetchAllData(res.starships, res.characters, res.planets)
    },
     err => this.error = true)
    this.handleWindowResize()
  }

  handleWindowResize() {
    this.colsWidth = (window.innerWidth <= 600) ? 1 : 6;
  }

  getYearOnly(release_date: string) {
    const date = new Date(release_date)
    return date.getFullYear()
  }

  convertPrice(ship_cost: string) {
    if (ship_cost === "unknown") {
      return "Desconocido"
    }
    const n = parseInt(ship_cost)
    return n.toLocaleString()
  }

  convertPopulation(population: string) {
    if (population === "unknown") {
      return "No se sabe cuántas"
    }
    const n = parseInt(population)
    return n.toLocaleString()
  }

  fetchAllData(shipsUrls: string[], charactersUrls: string[], planetsUrls: string[]) {
    shipsUrls.forEach(url => {
      this.api.getStarship(url).subscribe((res: any) => {
        this.starships = [...this.starships, res]
        this.starships.sort(
          (a: any, b: any) => a.name.toUpperCase() > b.name.toUpperCase() ? 1: -1
        )
      })
    })
    charactersUrls.forEach(url => {
      this.api.getCharacter(url).subscribe((res: any) => {
        this.characters = [...this.characters, res]
        this.characters.sort(
          (a: any, b: any) => a.name.toUpperCase() > b.name.toUpperCase() ? 1: -1
        )
      })
    })
    planetsUrls.forEach(url => {
      this.api.getPlanet(url).subscribe((res: any) => {
        this.planets = [...this.planets, res]
        this.planets.sort(
          (a: any, b: any) => a.name.toUpperCase() > b.name.toUpperCase() ? 1: -1
        )
      })
    })
  }

}
