import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    // Simulate call to a backend server
    console.log(`GET request to: ${this.path}/doubled/${value}`);
    return of(value*2);
  }
}
