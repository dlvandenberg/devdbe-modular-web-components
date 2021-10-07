import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { createCustomElement } from '@angular/elements';

import { 
  DoubledModule,
  DOUBLE_PATH
} from '@devdbe/doubled';
import {
  HalvedModule,
  HALVE_PATH
} from '@devdbe/halved';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DoubledModule,
    HalvedModule
  ],
  providers: [
    {
      provide: DOUBLE_PATH, useFactory: () => window['__env'].doubledPath
    },
    {
      provide: HALVE_PATH, useFactory: () => window['__env'].halvedPath
    }
  ],
  bootstrap: []
})
export class AppModule {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap() {
    const counterWriterElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('counter-writer', counterWriterElement);
  }
}
