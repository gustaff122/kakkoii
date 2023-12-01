import { NgModule } from '@angular/core';
import { SeriesBrowserRoutingComponent } from './series-browser-routing.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeriesBrowserRoutingModule } from './series-browser-routing.module';

@NgModule({
  declarations: [
    SeriesBrowserRoutingComponent,
  ],
  imports: [
    CommonModule,
    SeriesBrowserRoutingModule,
    RouterModule,
  ],
})
export class SeriesBrowserModule {
}