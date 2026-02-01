import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchingBlinddateComponent } from './searching-blinddate.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SearchingBlinddateComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SearchingBlinddateComponent
  ]
})
export class SearchingBlinddateModule { }
