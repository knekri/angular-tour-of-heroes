import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';

@Component({
  selector: 'app-heroes',                 // selector— the component's CSS element selector
  templateUrl: './heroes.component.html', // templateUrl— the location of the component's template file.
  styleUrls: ['./heroes.component.css']   // styleUrls— the location of the component's private CSS styles.

})
export class HeroesComponent implements OnInit {

  hero: Hero = { id: 1, name: 'Windstorm' };

  constructor() {
  }

  ngOnInit(): void {
  }

}
