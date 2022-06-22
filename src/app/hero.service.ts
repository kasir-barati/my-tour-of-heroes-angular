import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // read this from environment.ts
  private heroesUrl = 'api/heroes';

  /**
   * A typical "service-in-service" scenario:
   *   - You inject the MessageService into the HeroService which is injected into the HeroesComponent.
   *   - To get a better feeling: https://stackoverflow.com/questions/41117141
   */
  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient,
  ) {}

  getHeroes(): Observable<Hero[]> {
    const observableHeroes = this.httpClient
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        /**
         * tap operator:
         * - tap into the flow of observable values
         * - tap() operator, which looks at the observable values,
         *   does something with those values, and passes them along.
         * - The tap() callback doesn't touch the values themselves.
         */
        tap((heroes) => this.logInMessage('Heroes fetched')),
        /**
         * catchError() operator
         * - intercepts an Observable that failed.
         * - operator then passes the error to the error handling function.
         * -
         */
        catchError(this.handleError<Hero[]>('getHeroes', [])),
      );
    this.messageService.add('HeroService: fetched heroes');
    return observableHeroes;
  }

  getHeroById(id: number): Observable<Hero> {
    const hero = this.httpClient
      .get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap((hero) => this.logInMessage('Hero fetched')),
        catchError(this.handleError<Hero>(`getHeroById, id=${id}`)),
      );

    this.logInMessage(`fetched hero id=${id}`);
    return hero;
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.httpClient
      .put<Hero>(`${this.heroesUrl}/${hero.id}`, hero)
      .pipe(
        tap((hero) =>
          this.logInMessage(`Hero updated, id=${hero.id}`),
        ),
        catchError(this.handleError<Hero>('updateHero')),
      );
  }

  addHero(heroName: string): Observable<Hero> {
    return this.httpClient
      .post<Hero>(this.heroesUrl, {
        name: heroName,
      })
      .pipe(
        tap((hero) =>
          this.logInMessage(`Hero created, name=${heroName}`),
        ),
        catchError(this.handleError<Hero>('addHero')),
      );
  }

  deleteHero(id: number): Observable<Hero> {
    return this.httpClient
      .delete<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap((hero) =>
          this.logInMessage(`Delete operation done, id=${id}`),
        ),
        catchError(this.handleError<Hero>('Hero deleted')),
      );
  }

  searchHeroes(name: string): Observable<Hero[]> {
    if (!name.trim()) {
      return of([]);
    }

    return this.httpClient
      .get<Hero[]>(`${this.heroesUrl}?name=${name}`)
      .pipe(
        tap((heroes) =>
          this.logInMessage(
            heroes.length > 0
              ? `Filtered heroes by name=${name}`
              : `No hero matched with name=${name}`,
          ),
        ),
        catchError(
          this.handleError<Hero[]>(`Search hero, name=${name}`),
        ),
      );
  }

  // Another approach in observables. TBH IDK so much about the difference but I will do understand
  // getHeroes(): Observable<Hero> {
  //   return of(...HEROES);
  // }

  private handleError<T>(
    operation = 'operation',
    result?: T,
  ): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.logInMessage(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private logInMessage(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
