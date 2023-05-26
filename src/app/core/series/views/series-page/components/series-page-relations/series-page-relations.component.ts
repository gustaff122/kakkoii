import { ChangeDetectionStrategy, Component, Input, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesPageRelationsComponentStore } from './series-page-relations.component.store';
import { Observable } from 'rxjs';
import { SeriesRelation } from '@kakkoii/interfaces/series-relation';
import { LoadingSpinnerComponent } from '@kakkoii/utils/loading-spinner/loading-spinner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'kk-series-page-relations',
  templateUrl: './series-page-relations.component.html',
  styleUrls: [ './series-page-relations.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SeriesPageRelationsComponentStore
  ],
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    RouterLink,
  ],
  standalone: true,
})
export class SeriesPageRelationsComponent implements OnInit {
  @Input() public seriesId: string;

  public readonly relations$: Observable<SeriesRelation[]> = this.seriesPageRelationsComponentStore.relations$;
  public readonly hasRelations$: Observable<boolean> = this.seriesPageRelationsComponentStore.hasRelations$;
  public readonly loading$: Observable<boolean> = this.seriesPageRelationsComponentStore.loading$;

  constructor(
    @Self() private readonly seriesPageRelationsComponentStore: SeriesPageRelationsComponentStore
  ) {
  }

  public ngOnInit(): void {
    this.seriesPageRelationsComponentStore.getRelations({ seriesId: this.seriesId })
  }
}
