import { Component, Input } from '@angular/core';
import { Series } from '@kakkoii/interfaces/series';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TagsPipe } from '@kakkoii/pipes/tags.pipe';
import { ImgFallbackDirective } from '@kakkoii/directives/img-fallback.directive';

@Component({
  selector: 'kk-series-thumbnail',
  templateUrl: './series-thumbnail.component.html',
  styleUrls: [ './series-thumbnail.component.scss' ],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TagsPipe,
    ImgFallbackDirective,
  ],
})
export class SeriesThumbnailComponent {
  @Input() public series: Series;
}
