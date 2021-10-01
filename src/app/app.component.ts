import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="modular-container">
      <h1>Modular App with web components</h1>
      <h2>Web component 1:</h2>
      <hr>
      <count-write></count-write>
      <br/>
      <h2>Web component 2:</h2>
      <p>TODO</p>
    </div>    
  `,
  styles: [
    '.modular-container { padding: 1em; border: 1px dashed #000; }'
  ]
})
export class AppComponent {
}
