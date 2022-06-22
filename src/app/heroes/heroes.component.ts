import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  // Please note that mark nullable parameters as nullable
  selectedHero?: Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
  ) {
    /**
     * Reserve the constructor for:
     *   - minimal initialization - e.x. wiring constructor parameters to properties.
     *   - The constructor shouldn't do anything.
     *   - It certainly shouldn't call a function that makes HTTP requests.
     */
    this.heroes = [];
  }

  ngOnInit(): void {
    /**
     * Angular calls ngOnInit() at an appropriate time after constructing a HeroesComponent instance.
     * So ngOnInit lifecycle hook is a better place to do a HTTP request.
     */
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    // Because I guess we are using pass by reference changes in the selectedHero goes all the way up to reach to the heroes property.
    this.selectedHero = hero;
    this.messageService.add(
      `HeroesComponent: Selected hero id=${hero.id}`,
    );
  }

  private getHeroes(): void {
    this.heroService.getHeroes().subscribe({
      next: (heroes) => {
        this.heroes = heroes;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Getting heroes completed.');
      },
    });
  }
}
