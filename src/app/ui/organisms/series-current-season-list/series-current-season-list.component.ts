import { ChangeDetectionStrategy, Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeriesCurrentSeasonListComponentStore } from './series-current-season-list.component.store';
import { Observable } from 'rxjs';
import { Series } from '@kakkoii/interfaces/series';
import { LoadingSpinnerComponent } from '@kakkoii/utils/loading-spinner/loading-spinner.component';
import { SeriesListComponent } from '../../molecules/series-list/series-list.component';

@Component({
  selector: 'kk-series-current-season-list',
  templateUrl: './series-current-season-list.component.html',
  styleUrls: [ './series-current-season-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SeriesCurrentSeasonListComponentStore,
  ],
  imports: [
    CommonModule,
    RouterLink,
    LoadingSpinnerComponent,
    SeriesListComponent,
  ],
  standalone: true,
})
export class SeriesCurrentSeasonListComponent implements OnInit {

  public readonly series$: Observable<Series[]> = this.seriesCurrentSeasonListComponentStore.series$;
  public readonly hasSeries$: Observable<boolean> = this.seriesCurrentSeasonListComponentStore.hasSeries$;
  public readonly loading$: Observable<boolean> = this.seriesCurrentSeasonListComponentStore.loading$;

  constructor(
    @Self() private readonly seriesCurrentSeasonListComponentStore: SeriesCurrentSeasonListComponentStore,
  ) {
  }

  public ngOnInit(): void {
    this.seriesCurrentSeasonListComponentStore.getSeries()
  }
}