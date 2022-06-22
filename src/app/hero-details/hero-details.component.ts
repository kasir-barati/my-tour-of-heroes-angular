import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css'],
})
export class HeroDetailsComponent implements OnInit {
  @Input()
  hero?: Hero;

  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    const heroId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getHero(Number(heroId));

    /**
     * Correct usage:
     *   - this.activatedRoute.paramMap.subscribe
     * Wrong usage:
     *   - this.activatedRoute.params.subscribe
     *
     * queryParams: Observable<Params>
     * An observable of the query parameters shared by all the routes.
     *
     * params: Observable<Params>
     * An observable of the matrix parameters scoped to this route.
     *
     * paramMap: Observable<ParamMap>
     * An Observable that contains a map of the required and optional parameters specific to the route.'
     * The map supports retrieving single and multiple values from the same parameter.
     */
  }

  getHero(id: number) {
    this.heroService.getHeroById(id).subscribe({
      next: (hero) => {
        debugger;
        this.hero = hero;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Fetching hero information completed');
      },
    });
  }

  onClickGoBack() {
    this.location.back();
  }

  onSave(hero: Hero) {
    return this.heroService.updateHero(hero).subscribe({
      next: (hero) => {
        // Why?
        this.onClickGoBack();
      },
    });
  }
}
