import { Inject, Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { DOUBLE_PATH } from './double-path.token';

@Injectable({
  providedIn: 'root'
})
export class DoubleService {

  private path = '';

  constructor(@Inject(DOUBLE_PATH) doublePath: string) {
    this.path = doublePath;
  }

  public getDoubled(value: number): Observable<number> {
    return of(value * 2).pipe(
        tap(_ => console.log(`GET request to: ${this.path}/doubled/${value}`)),
        delay(500) // simulate network load 
      );
  }
}
