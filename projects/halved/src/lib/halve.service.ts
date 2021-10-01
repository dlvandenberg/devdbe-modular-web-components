import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    // Simulate call to a backend
    console.log(`GET request to: ${this.path}/halved/${value}`);
    return of(value/2);
  }
}
