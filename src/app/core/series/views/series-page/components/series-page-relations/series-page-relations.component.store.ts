import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { SeriesRelation } from '@kakkoii/interfaces/series-relation';
import { RelationsService } from '@kakkoii/services/relations.service';

interface SeriesPageRelationsComponentState extends DefaultComponentState {
  relations: SeriesRelation[],
}

@Injectable()
export class SeriesPageRelationsComponentStore extends DefaultComponentStore<SeriesPageRelationsComponentState> {

  public readonly relations$: Observable<SeriesRelation[]> = this.select((state) => state.relations);
  public readonly hasRelations$: Observable<boolean> = this.select((state) => state.relations.length > 0);

  public readonly getRelations = this.effect((origin$: Observable<{ seriesId: number }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ seriesId }) => {
        return this.relationsService.getSeriesRelations(seriesId)
          .pipe(
            tapResponse((relations) => {
              this.patchState({
                relations: relations,
                loading: false,
              });
            }, ({ error }: HttpErrorResponse) => {
              this.patchState({
                loading: false,
                error,
              });
            }),
          );
      }),
    );
  });

  constructor(
    private readonly relationsService: RelationsService,
  ) {
    super({
      relations: [],
      loading: false,
      error: null,
    });
  }
}