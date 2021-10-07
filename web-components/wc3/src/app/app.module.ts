import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { 
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap(): void {
    const customElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('wc-reader', customElement);
  }
}
