import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesBrowserRoutingComponent } from './series-browser-routing.component';
import { SeriesBrowserComponent } from './views/series-browser/series-browser.component';

const routes: Routes = [
  {
    path: '',
    component: SeriesBrowserRoutingComponent,
    children: [
      {
        path: '',
        component: SeriesBrowserComponent,
      },
      {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class SeriesBrowserRoutingModule {
}