import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HalveService } from './halve.service';

@Component({
  selector: 'lib-halve',
  template: `
    <div class="container">
      <h2>Halve Component</h2>
      <p>
        The number {{ value }} is halved: {{ halveService.getHalved(value) | async }}
      </p>
    </div>
  `,
  styleUrls: [ './halve.component.scss' ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HalveComponent {
  @Input()
  public value = 0;

  constructor(public readonly halveService: HalveService) { }
}
