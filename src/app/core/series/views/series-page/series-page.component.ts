import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesPageHeroComponent } from './components/series-page-hero/series-page-hero.component';
import { Series } from '@kakkoii/interfaces/series';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { ActivatedRoute } from '@angular/router';
import { SeriesPageRelationsComponent } from './components/series-page-relations/series-page-relations.component';
import { SeriesPageEpisodesComponent } from './components/series-page-episodes/series-page-episodes.component';

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
    SeriesPageEpisodesComponent,
  ],
})
export class SeriesPageComponent {
  public readonly series: Series = this.activatedRoute.snapshot.data[SERIES];

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
  }
}
