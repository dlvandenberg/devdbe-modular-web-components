import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DoubleService } from './double.service';

@Component({
  selector: 'lib-double',
  template: `
    <div class="container">
      <h2>Double Component</h2>
      <p>
        The number {{ value }} is doubled: {{ doubleService.getDoubled(value) | async }}
      </p>
    </div>
  `,
  styleUrls: [
    './double.component.scss'
  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DoubleComponent {
  @Input()
  public value = 0;

  constructor(public readonly doubleService: DoubleService) { }
}
