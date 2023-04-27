import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SeriesRelations } from '@kakkoii/interfaces/series-relations';

@Component({
  selector: 'kk-series-page-relations',
  templateUrl: './series-page-relations.component.html',
  styleUrls: [ './series-page-relations.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgOptimizedImage,
  ],
  standalone: true,
})
export class SeriesPageRelationsComponent {
  @Input() public relations: SeriesRelations[]
}
