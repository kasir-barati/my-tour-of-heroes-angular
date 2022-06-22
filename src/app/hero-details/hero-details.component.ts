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
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (queryParams) => {
        const heroId = queryParams['id'];
        debugger;
        this.getHero(heroId);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Getting query params completed.');
      },
    });
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
}
