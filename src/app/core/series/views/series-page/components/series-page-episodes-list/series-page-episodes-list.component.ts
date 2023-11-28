import { ChangeDetectionStrategy, Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesPageEpisodesListComponentStore } from './series-page-episodes-list.component.store';
import { Observable } from 'rxjs';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { NgIconComponent } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { DirectionType } from '@kakkoii/types/direction-type';

@Component({
  selector: 'kk-series-page-episodes-list',
  templateUrl: './series-page-episodes-list.component.html',
  styleUrls: [ './series-page-episodes-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SeriesPageEpisodesListComponentStore,
  ],
  imports: [
    CommonModule,
    NgIconComponent,
    RouterLink,
  ],
  standalone: true,
})
export class SeriesPageEpisodesListComponent implements OnInit {
  public direction: DirectionType = 'asc';

  public readonly episodes$: Observable<SeriesEpisode[]> = this.seriesPageEpisodesListComponentStore.episodes$;
  public readonly canLoadMore$: Observable<boolean> = this.seriesPageEpisodesListComponentStore.canLoadMore$;
  public readonly loading$: Observable<boolean> = this.seriesPageEpisodesListComponentStore.loading$;
  public readonly totalCount$: Observable<number | null> = this.seriesPageEpisodesListComponentStore.totalCount$;

  constructor(
    @Self() private readonly seriesPageEpisodesListComponentStore: SeriesPageEpisodesListComponentStore,
  ) {
  }

  public ngOnInit(): void {
    this.seriesPageEpisodesListComponentStore.getEpisodes({ direction: this.direction });
  }

  public loadEpisodesHandler(): void {
    this.seriesPageEpisodesListComponentStore.getEpisodes({ direction: this.direction });
  }

  public setDirectionAscHandler(): void {
    this.direction = 'asc';
    this.seriesPageEpisodesListComponentStore.changeDirection({ direction: this.direction });
  }

  public setDirectionDescHandler(): void {
    this.direction = 'desc';
    this.seriesPageEpisodesListComponentStore.changeDirection({ direction: this.direction });
  }
}
