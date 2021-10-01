import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="count-write">
      <h2>Counter - write</h2>
      <button (click)="startInterval()" [disabled]="interval">Start</button> | <button (click)="stopInterval()" [disabled]="!interval"></button>
    </div>
  `,
  styles: []
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
