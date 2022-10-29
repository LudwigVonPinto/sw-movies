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
  starships: {name: string, model: string, starship_class: string}[] = [];
  characters: {name: string, gender: string, birth_year: string}[] = [];
  planets: {name: string, climate: string, population: string}[] = [];
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
    this.colsWidth = (window.innerWidth <= 600) ? 1 : 6;
  }

  handleWindowResize() {
    this.colsWidth = (window.innerWidth <= 600) ? 1 : 6;
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
