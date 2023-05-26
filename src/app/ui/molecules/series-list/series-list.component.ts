import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Series } from '@kakkoii/interfaces/series';
import { SeriesThumbnailComponent } from '../../atoms/series-thumbnail/series-thumbnail.component';

@Component({
  selector: 'kk-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: [ './series-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    SeriesThumbnailComponent,
  ],
  standalone: true,
})
export class SeriesListComponent {
  @Input() series: Series[];
  @Input() sectionTitle: string;
  @Input() loading: boolean;
  @Input() totalCount: number;
}
