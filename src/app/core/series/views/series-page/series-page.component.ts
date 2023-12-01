import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesPageHeroComponent } from './components/series-page-hero/series-page-hero.component';
import { Series } from '@kakkoii/interfaces/series';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SeriesPageRelationsComponent } from './components/series-page-relations/series-page-relations.component';
import { SeriesPageEpisodesListComponent } from './components/series-page-episodes-list/series-page-episodes-list.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'kk-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: [ './series-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    SeriesPageHeroComponent,
    SeriesPageRelationsComponent,
    SeriesPageEpisodesListComponent,
    RouterOutlet,
    NgScrollbarModule,
  ],
})
export class SeriesPageComponent {
  public readonly series: Series = this.activatedRoute.snapshot.data[SERIES];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  public scrollTo(el: HTMLElement): void {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
