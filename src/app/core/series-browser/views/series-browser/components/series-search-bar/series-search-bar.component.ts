import { Component, EventEmitter, OnDestroy, OnInit, Output, SkipSelf } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SeriesStatus } from '@kakkoii/types/series-status';
import { SeriesType } from '@kakkoii/types/series-type';
import { SeriesTags } from '@kakkoii/types/series-tags';
import { NgSelectModule } from '@ng-select/ng-select';
import { tagsData } from '@kakkoii/utils/tags.data';
import { SeriesBrowserComponentStore } from '../../series-browser.component.store';
import { SeriesListFilters } from '@kakkoii/interfaces/series-list-filters';
import { Season } from '@kakkoii/types/season';

interface SeriesFiltersForm {
  name: FormControl<string>;
  status: FormControl<SeriesStatus>;
  type: FormControl<SeriesType>;
  tags: FormControl<SeriesTags[]>;
  season: FormControl<Season>;
  year: FormControl<number>;
}

@Component({
  selector: 'kk-series-search-bar',
  templateUrl: './series-search-bar.component.html',
  styleUrls: [ './series-search-bar.component.scss' ],
  providers: [
    SeriesBrowserComponentStore,
  ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class SeriesSearchBarComponent implements OnInit, OnDestroy {
  @Output() public readonly filtersChange: EventEmitter<Partial<SeriesListFilters>> = new EventEmitter<Partial<SeriesListFilters>>();

  public readonly tagsData: { label: string, value: SeriesTags }[] = tagsData;

  public readonly loading$: Observable<boolean> = this.seriesBrowserComponentStore.loading$;
  private subscriptions: Subscription = new Subscription();
  public form: FormGroup<SeriesFiltersForm>;

  constructor(
    @SkipSelf() private readonly seriesBrowserComponentStore: SeriesBrowserComponentStore,
    private readonly formBuilder: FormBuilder,
  ) {
    }

  public ngOnInit(): void {
    this.buildForm()

    this.subscriptions.add(
      this.form.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(() => {
        this.filtersChange.emit(this.form.getRawValue())
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<SeriesFiltersForm>({
      name: new FormControl(null),
      status: new FormControl(null),
      type: new FormControl(null),
      tags: new FormControl(null),
      season: new FormControl(null),
      year: new FormControl(null),
    });
  }

}
