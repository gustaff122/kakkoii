import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesRoutingComponent } from './series-routing.component';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { seriesResolver } from '@kakkoii/resolvers/series-resolver/series.resolver';
import { seriesExistsGuard } from '@kakkoii/guards/series-exists.guard';
import { SeriesPageComponent } from './views/series-page/series-page.component';
import { SeriesPageEpisodesListComponent } from './views/series-page/components/series-page-episodes-list/series-page-episodes-list.component';
import { SeriesPageEpisodePlayerComponent } from './views/series-page/components/series-page-episode-player/series-page-episode-player.component';
import { episodeAvailableGuard } from '@kakkoii/guards/episode-available.guard';

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
        },
        children: [
          {
            path: '',
            redirectTo: 'episodes',
            pathMatch: 'full'
          },
          {
            path: 'episodes',
            component: SeriesPageEpisodesListComponent,
          },
          {
            path: 'episodes/:epNumber',
            component: SeriesPageEpisodePlayerComponent,
            canActivate: [ episodeAvailableGuard ],
            runGuardsAndResolvers: 'always'
          },
        ]
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