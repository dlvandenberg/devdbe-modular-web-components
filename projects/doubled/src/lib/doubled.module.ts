import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DoubleComponent } from './double.component';



@NgModule({
  declarations: [
    DoubleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DoubleComponent
  ]
})
export class DoubledModule { }
