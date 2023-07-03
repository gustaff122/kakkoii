import { Component, EventEmitter, OnDestroy, OnInit, Output, SkipSelf } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SeriesStatus } from '@kakkoii/types/series-status';
import { SeriesType } from '@kakkoii/types/series-type';
import { SeriesTags } from '@kakkoii/types/series-tags';
import { NgSelectModule } from '@ng-select/ng-select';
import { tagsData } from '@kakkoii/utils/tags.data';
import { SeriesBrowserComponentStore } from '../../series-browser.component.store';
import { SeriesListFilters } from '@kakkoii/interfaces/series-list-filters';
import { Season } from '@kakkoii/types/season';
import { NgIconComponent } from '@ng-icons/core';
import { DropDownAnimation } from '@kakkoii/animations/dropdown.animation';
import { ActivatedRoute, Router } from '@angular/router';

interface SeriesFiltersForm {
  name: FormControl<string>;
  status: FormControl<SeriesStatus>;
  type: FormControl<SeriesType>;
  tags: FormControl<SeriesTags[]>;
  season_type: FormControl<Season>;
  season_year: FormControl<number>;
}

@Component({
  selector: 'kk-series-search-bar',
  templateUrl: './series-search-bar.component.html',
  styleUrls: [ './series-search-bar.component.scss' ],
  providers: [
    SeriesBrowserComponentStore,
  ],
  animations: [ DropDownAnimation ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgIconComponent,
  ],
})
export class SeriesSearchBarComponent implements OnInit, OnDestroy {
  @Output() public readonly filtersChange: EventEmitter<Partial<SeriesListFilters>> = new EventEmitter<Partial<SeriesListFilters>>();

  public readonly tagsData: { label: string, value: SeriesTags }[] = tagsData;

  public readonly droppedDown$: Observable<boolean> = this.seriesBrowserComponentStore.droppedDown$;
  public readonly loading$: Observable<boolean> = this.seriesBrowserComponentStore.loading$;
  private subscriptions: Subscription = new Subscription();
  public form: FormGroup<SeriesFiltersForm>;

  constructor(
    @SkipSelf() private readonly seriesBrowserComponentStore: SeriesBrowserComponentStore,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
    this.initQueryParams();
    this.getQueryParams();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public dropDownHandler(): void {
    this.seriesBrowserComponentStore.dropDown();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<SeriesFiltersForm>({
      name: new FormControl(null),
      status: new FormControl(null),
      type: new FormControl(null),
      tags: new FormControl(null),
      season_type: new FormControl(null),
      season_year: new FormControl(null),
    });
  }

  private getQueryParams(): void {
    this.subscriptions.add(
      this.activatedRoute.queryParams.subscribe(params => {
        const tags = typeof (params['tags'] === undefined) ? null : (Array.isArray(params['tags'])) ? params['tags'] : [ params['tags'] ];
        this.form.patchValue({ ...params, tags });
      }),
    );
  }

  private initQueryParams(): void {
    this.subscriptions.add(
      this.form.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(() => {
        this.filtersChange.emit(this.form.getRawValue());

        const url = this.router.createUrlTree([], {
          relativeTo: this.activatedRoute, queryParams: this.form.getRawValue(),
          queryParamsHandling: 'merge',
        }).toString();

        this.location.go(url);
      }),
    );
  }
}
