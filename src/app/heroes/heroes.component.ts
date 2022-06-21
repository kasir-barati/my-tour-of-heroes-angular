import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = HEROES;
  // Please note that mark nullable parameters as nullable
  selectedHero?: Hero;

  constructor() {}

  ngOnInit(): void {}

  onSelect(hero: Hero): void {
    // Because I guess we are using pass by reference changes in the selectedHero goes all the way up to reach to the heroes property.
    this.selectedHero = hero;
  }
}
