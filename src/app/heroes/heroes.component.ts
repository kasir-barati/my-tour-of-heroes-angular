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

  onClickAddHero(heroName: string) {
    this.heroService.addHero(heroName).subscribe();
    // When addHero() saves successfully, the subscribe() callback receives the new hero.
    // But IMO we cannot just pushes it into to the heroes list for display. Maybe someone
    // else added another hero
    this.getHeroes();
  }

  onClickDeleteHero(id: number) {
    /**
     * Delegates hero deletion to the HeroService
     * Responsible for updating its own list of heroes
     * There's really nothing for the component to do
     * with the Observable returned by heroService.deleteHero()
     * but it must subscribe anyway.
     * TODO: what about error handling? Remember you did it in the service
     */
    this.heroService.deleteHero(id).subscribe();
    // IMO it was better to do this unless I got sure that filtering current values are OK
    this.getHeroes();
  }
}
