import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-heroes',                 // selector— the component's CSS element selector
  templateUrl: './heroes.component.html', // templateUrl— the location of the component's template file.
  styleUrls: ['./heroes.component.css']   // styleUrls— the location of the component's private CSS styles.

})
export class HeroesComponent implements OnInit {

  hero: Hero = { id: 1, name: 'Windstorm' };

  heroes: Hero[];
  selectedHero: Hero;

  // The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
  constructor(private heroService: HeroService, private  messageService: MessageService) {
  }

  // https://angular.io/tutorial/toh-pt4#call-it-in-ngoninit
  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.messageService.add(`User selected the ${hero.name} hero`);
    this.selectedHero = hero;
  }

  getHeroes(): void {
    const initHeroes = heroes => this.heroes = heroes;
    this.heroService.gerHeroes().subscribe(initHeroes);
  }
}
