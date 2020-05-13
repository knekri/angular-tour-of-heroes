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

  heroes: Hero[];

  // The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
  constructor(private heroService: HeroService, private  messageService: MessageService) {
  }

  // https://angular.io/tutorial/toh-pt4#call-it-in-ngoninit
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    const allHeroes = heroes => this.heroes = heroes;
    this.heroService.getHeroes().subscribe(allHeroes);
  }

  addHero(name: string) {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({name} as Hero).subscribe(hero => this.heroes.push(hero));
  }

  delHero(hero: Hero): void {
    this.heroes = this.heroes.filter(value => value !== hero);
    // If you neglect to subscribe(), the service will not send the delete request to the server.
    // As a rule, an Observable does nothing until something subscribes.
    this.heroService.deleteHero(hero).subscribe();
  }
}
