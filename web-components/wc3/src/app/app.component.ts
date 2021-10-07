import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h2>Non-MF Reader</h2>
      <p>The current value of the counter is: <span>{{ value }}</span></p>
    </div>
  `,
  styles: [
    '.container { padding: 1em; background-color: #181818; color: #fff; border: 2px solid green; }'
  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit, OnDestroy {
  public value = 0;
  private destroyed = new Subject<void>();

  public ngOnInit(): void {
    fromEvent(window, 'counter-update')
      .pipe(takeUntil(this.destroyed))
      .subscribe(event => {
        const customEvent = (event as CustomEvent);
        console.log('Received counter-update event', customEvent.detail);
        this.value = customEvent.detail.value;
    })
  }

  public ngOnDestroy(): void {
    this.destroyed.next();
  }
}

