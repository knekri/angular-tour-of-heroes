import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../../hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../../hero.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    // The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent
    // This component is interested in the route's parameters extracted from the URL. The "id" parameter is the id of the hero to display.
    private route: ActivatedRoute,
    private heroService: HeroService,
    // The location is an Angular service for interacting with the browser.
    // You'll use it later to navigate back to the view that navigated here.
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // https://angular.io/tutorial/toh-pt5#extract-the-id-route-parameter
    const id = +this.route.snapshot.paramMap.get('id');
    const selectedHero = hero => this.hero = hero;
    this.heroService.getHero(id).subscribe(selectedHero);
  }

  goBack(): void {
    this.location.back();
  }
}
