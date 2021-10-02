import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="modular-container">
      <h1>Modular App with web components</h1>
      <h2>Web component 1:</h2>
      <hr>
      <count-write></count-write>
      <hr>
      <h2>Web component 2:</h2>
      <count-read></count-read>
    </div>    
  `,
  styles: [
    '.modular-container { padding: 1em; border: 1px dashed #000; background-color: #c3c3c3; }'
  ]
})
export class AppComponent {
}
