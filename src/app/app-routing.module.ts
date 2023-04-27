import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeResolver } from '@kakkoii/resolvers/home-resolver/home.resolver';
import { HOME } from '@kakkoii/resolvers/home-resolver/home.key';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('@kakkoii/core/home/home.component').then(c => c.HomeComponent),
        resolve: {
          [HOME]: homeResolver
        }
      },
      {
        path: 'series',
        loadChildren: () => import('@kakkoii/core/series/series.module').then(m => m.SeriesModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
