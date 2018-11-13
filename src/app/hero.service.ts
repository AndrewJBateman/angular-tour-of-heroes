import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 /*RxJS of() returns an observable of mock heroes (Observable<Hero[]>).*/
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/*Angular creates a single, shared instance of HeroService  
and injects into any class that asks for it.*/
@Injectable({ providedIn: 'root' })
export class HeroService {

	private heroesUrl = 'api/heroes';  // URL to web api

	constructor(
  private http: HttpClient,
  private messageService: MessageService) { }

	/** GET heroes from the server. Uses the RxJS tap operator, 
	 * which looks at the observable values, does something with 
	 * those values, and passes them along. The tap call back 
	 * doesn't touch the values themselves*/
	getHeroes (): Observable<Hero[]> {
  	return this.http.get<Hero[]>(this.heroesUrl)
    	.pipe(
      	tap(_ => this.log('fetched heroes')),
      	catchError(this.handleError('getHeroes', []))
    	);
	}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
  	this.messageService.add(`HeroService: ${message}`);
	}

	


	/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/** GET hero by id. Will 404 if id not found */
	getHero(id: number): Observable<Hero> {
  	const url = `${this.heroesUrl}/${id}`;
  	return this.http.get<Hero>(url).pipe(
    	tap(_ => this.log(`fetched hero id=${id}`)),
    	catchError(this.handleError<Hero>(`getHero id=${id}`))
  	);
	}
	/** PUT: update the hero on the server
	The HttpClient.put() method takes three parameters:
	the URL, the data to update & options	*/

	updateHero (hero: Hero): Observable<any> {
  	return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
    	tap(_ => this.log(`updated hero id=${hero.id}`)),
    	catchError(this.handleError<any>('updateHero'))
  	);
	}

	/** POST: add a new hero to the server */
	addHero (hero: Hero): Observable<Hero> {
  	return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
    	tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
    	catchError(this.handleError<Hero>('addHero'))
  	);
	}
	/** DELETE: delete the hero from the server */
deleteHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}
/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}
  
}
/*An observable is an array whose items arrive asynchronously over time. 
Observables help you manage asynchronous data, such as data coming from 
a backend service. Observables are used within Angular itself, including 
Angular's event system and its http client service.*/
