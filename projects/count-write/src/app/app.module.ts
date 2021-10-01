import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

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
      provide: DOUBLE_PATH, useFactory: () => window['__env'].doublePath
    },
    {
      provide: HALVE_PATH, useFactory: () => window['__env'].halvePath
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }