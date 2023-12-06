import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { homeResolver } from '@kakkoii/resolvers/home-resolver/home.resolver';
import { HOME } from '@kakkoii/resolvers/home-resolver/home.key';
import { KakkoiiRouteReuseStrategy } from '@kakkoii/utils/reload.strategy';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('@kakkoii/core/home/home.component').then(c => c.HomeComponent),
        resolve: {
          [HOME]: homeResolver,
        },
      },
      {
        path: 'series',
        loadChildren: () => import('@kakkoii/core/series/series.module').then(m => m.SeriesModule),
      },
      {
        path: 'browser',
        loadChildren: () => import('@kakkoii/core/series-browser/series-browser.module').then(m => m.SeriesBrowserModule),
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    enableTracing: false,
    anchorScrolling: 'enabled',
    urlUpdateStrategy: 'deferred',
    scrollPositionRestoration: 'enabled',
    paramsInheritanceStrategy: 'always',
  }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: KakkoiiRouteReuseStrategy },
  ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
