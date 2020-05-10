import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

// @Injectable() decorator marks the class as one that participates in the dependency injection system.
// The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies.
@Injectable({
  providedIn: 'root'
})
// Services are a great way to share information among classes that don't know each other
export class HeroService {

  constructor(private messageService: MessageService) {}

  // Observable<Hero[]> that emits a single value, the array of mock heroes.
  gerHeroes(): Observable<Hero[]> {
    this.messageService.add('Heroes are fetched!');
    return of(HEROES);
  }
}
