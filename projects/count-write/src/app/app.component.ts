import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="count-write">
      <h2>Counter - write</h2>
      <button (click)="startInterval()" [disabled]="interval">Start</button> | <button (click)="stopInterval()" [disabled]="!interval">Stop</button>
      <hr>
      <div class="cont">
        <lib-halve [value]="value"></lib-halve>
      </div>
      <div class="cont">
        <lib-double [value]="value"></lib-double>
      </div>
    </div>
  `,
  styles: [
    '.count-write { padding: 1em; background-color: #343434; color: #fff; border: 2px solid #d4d4d4; }',
    '.cont { padding: 1em; margin: 1em; background-color: #333; color: #fff; border: 2px solid #aeaeae; }'
  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  public value = 0;
  public interval;

  public startInterval(): void {
    if (!this.interval) {
      this.interval = setInterval(
        () => {
          this.value++;
          console.log('Increased value');
          window.dispatchEvent(new CustomEvent('value-update', {
            detail: {
              value: this.value
            }
          }));
          console.log('Dispatched event "value-update"');
        }, 5000 // 5 seconds
        );
    }
  }

  public stopInterval(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }
}
