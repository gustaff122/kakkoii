import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesRoutingComponent } from './series-routing.component';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { seriesResolver } from '@kakkoii/resolvers/series-resolver/series.resolver';
import { seriesExistsGuard } from '@kakkoii/guards/series-exists.guard';
import { SeriesPageComponent } from './views/series-page/series-page.component';

const routes: Routes = [
  {
    path: '',
    component: SeriesRoutingComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/',
      },
      {
        path: ':seriesPseudo',
        component: SeriesPageComponent,
        canActivate: [ seriesExistsGuard ],
        resolve: {
          [SERIES]: seriesResolver
        }
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
export class SeriesRoutingModule {
}