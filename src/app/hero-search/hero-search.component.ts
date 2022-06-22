import { Component, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  /**
   * The $ is a convention that indicates heroes$ is an Observable, not an array.
   */
  heroes$: Observable<Hero[]>;
  private searchedName: Subject<string>;

  constructor(private heroService: HeroService) {
    /**
     * A Subject is both a source of observable values and an Observable itself.
     *   - You can subscribe to a Subject as you would any Observable.
     *   - You can also push values into that Observable by calling its next(value)
     * method as the search() method does.
     */
    this.searchedName = new Subject<string>();
  }

  ngOnInit(): void {
    this.heroes$ = this.searchedName.pipe(
      /**
       * Wait 300ms after each keystroke before considering the term.
       * You'll never make requests more frequently than 300ms.
       *
       * Passing a new search term directly to the searchHeroes()
       * after every user keystroke would create an excessive amount of HTTP requests,
       * taxing server resources and burning through data plans.
       */
      debounceTime(300),
      /**
       * Ignore new term if same as previous term
       * Ensures that a request is sent only if the filter text changed.
       */
      distinctUntilChanged(),
      /**
       * - Switch to new search observable each time the term changes
       * - Calls the search service for each search term that makes it
       * through debounce() and distinctUntilChanged().
       * - Cancels and discards previous search observables, returning
       * only the latest search service observable.
       * - switchMap() preserves the original request order
       */
      switchMap((name) => this.heroService.searchHeroes(name)),
    );
  }

  onInputDoSearch(name: string): void {
    this.searchedName.next(name);
    // this.heroes$ = this.heroService.searchHeroes(name);
  }
}
