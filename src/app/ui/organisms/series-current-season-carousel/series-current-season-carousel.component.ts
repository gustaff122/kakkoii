import { ChangeDetectionStrategy, Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeriesCurrentSeasonCarouselComponentStore } from './series-current-season-carousel.component.store';
import { Observable } from 'rxjs';
import { Series } from '@kakkoii/interfaces/series';
import { LoadingSpinnerComponent } from '@kakkoii/utils/loading-spinner/loading-spinner.component';
import { SeriesCarouselComponent } from '../../molecules/series-carousel/series-carousel.component';

@Component({
  selector: 'kk-series-current-season-carousel',
  templateUrl: './series-current-season-carousel.component.html',
  styleUrls: [ './series-current-season-carousel.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SeriesCurrentSeasonCarouselComponentStore,
  ],
  imports: [
    CommonModule,
    RouterLink,
    SeriesCarouselComponent,
    LoadingSpinnerComponent,
  ],
  standalone: true,
})
export class SeriesCurrentSeasonCarouselComponent implements OnInit {

  public readonly series$: Observable<Series[]> = this.seriesCurrentSeasonListComponentStore.series$;
  public readonly hasSeries$: Observable<boolean> = this.seriesCurrentSeasonListComponentStore.hasSeries$;
  public readonly loading$: Observable<boolean> = this.seriesCurrentSeasonListComponentStore.loading$;

  constructor(
    @Self() private readonly seriesCurrentSeasonListComponentStore: SeriesCurrentSeasonCarouselComponentStore,
  ) {
  }

  public ngOnInit(): void {
    this.seriesCurrentSeasonListComponentStore.getSeries()
  }
}