import { Inject, Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { HALVE_PATH } from './halve-path.token';

@Injectable({
  providedIn: 'root'
})
export class HalveService {

  private path = '';

  constructor(@Inject(HALVE_PATH) halvePath: string) {
    this.path = halvePath;
  }

  public getHalved(value: number): Observable<number> {
    return of(value / 2).pipe(
        tap(_ => console.log(`GET request to: ${this.path}/halved/${value}`)),
        delay(500) // simulate network load
      );
  }
}
