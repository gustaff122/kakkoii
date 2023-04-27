import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Series } from '@kakkoii/interfaces/series';

@Component({
  selector: 'kk-series-page-hero',
  templateUrl: './series-page-hero.component.html',
  styleUrls: [ './series-page-hero.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
  ],
  standalone: true,
})
export class SeriesPageHeroComponent {
  @Input() public series: Series
}
