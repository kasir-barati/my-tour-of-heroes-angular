import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  /**
   * A typical "service-in-service" scenario:
   *   - You inject the MessageService into the HeroService which is injected into the HeroesComponent.
   *   - To get a better feeling: https://stackoverflow.com/questions/41117141
   */
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    const observableHeroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return observableHeroes;
  }

  getHeroById(id: number): Observable<Hero | undefined> {
    const hero = HEROES.filter((hero) => hero.id === id).shift();

    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  // Another approach in observables. TBH IDK so much about the difference but I will do understand
  // getHeroes(): Observable<Hero> {
  //   return of(...HEROES);
  // }
}
