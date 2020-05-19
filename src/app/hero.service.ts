import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

// @Injectable() decorator marks the class as one that participates in the dependency injection system.
// The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies.
@Injectable({
  providedIn: 'root'
})
// Services are a great way to share information among classes that don't know each other
export class HeroService {

  private heroesUrl = 'api/heroes';
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, private messageService: MessageService) {}

  // Observable<Hero[]> that emits a single value, the array of mock heroes.
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      // The catchError() operator intercepts an Observable that failed.
      // It passes the error an error handler that can do what it wants with the error.
      .pipe(tap(_ => this.log('heroes fetched')), catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getHero(id: number): Observable<Hero> {
    const url  = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(x => this.log(`hero fetched id= ${id}`)),
      catchError(this.handleError<Hero>(`getHero by id=${id}`))
    );

  }

  private log(message: string): void  {
    this.messageService.add(`HeroService: ${message}`);
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => this.log(`Updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Hero saved with id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(x => this.log(`Hero with id=${id} has been deleted`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ? this.log(`found heroes matching ${term}`) : this.log(`no heroes matching ${term}`) ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
