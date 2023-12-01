import { NgModule } from '@angular/core';
import { SeriesRoutingComponent } from './series-routing.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeriesRoutingModule } from './series-routing.module';

@NgModule({
  declarations: [
    SeriesRoutingComponent,
  ],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    RouterModule,
  ],
})
export class SeriesModule {
}