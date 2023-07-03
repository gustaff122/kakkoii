import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Series } from '@kakkoii/interfaces/series';
import { SeriesThumbnailComponent } from '../../atoms/series-thumbnail/series-thumbnail.component';
import { DropEnterAnimation } from '@kakkoii/animations/drop-enter.animation';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'kk-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: [ './series-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    DropEnterAnimation,
  ],
  imports: [
    CommonModule,
    RouterLink,
    SeriesThumbnailComponent,
    NgIconComponent,
  ],
  standalone: true,
})
export class SeriesListComponent {
  @Input() series: Series[];
  @Input() sectionTitle: string;
  @Input() loading: boolean;
  @Input() totalCount: number;

  public trackByFn(_index: number, item: Series): number {
    return item.anime_id;
  }
}
