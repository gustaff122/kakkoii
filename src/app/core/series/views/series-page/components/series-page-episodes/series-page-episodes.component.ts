import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';

@Component({
  selector: 'kk-series-page-episodes',
  templateUrl: './series-page-episodes.component.html',
  styleUrls: [ './series-page-episodes.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
  ],
  standalone: true,
})
export class SeriesPageEpisodesComponent {
  @Input() public episodes: SeriesEpisode[]
}
