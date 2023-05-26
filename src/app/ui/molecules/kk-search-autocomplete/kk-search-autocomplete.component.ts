import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { KkSearchAutocompleteComponentStore } from './kk-search-autocomplete.component.store';
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AbstractControl, FormsModule, NgControl } from '@angular/forms';
import { Series } from '@kakkoii/interfaces/series';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'kk-search-autocomplete',
  templateUrl: './kk-search-autocomplete.component.html',
  styleUrls: [ './kk-search-autocomplete.component.scss' ],
  providers: [
    KkSearchAutocompleteComponentStore,
  ],
  standalone: true,
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    RouterLink,
    NgIconComponent,
  ],
})
export class KkSearchAutocompleteComponent implements OnInit, OnDestroy {
  @Input() label: string = '';

  public seriesInput$ = new Subject<string>();

  public isRequired: boolean = false;
  public innerValue: string | number = null;

  public touched = false;

  public readonly loading$: Observable<boolean> = this.kkSeriesAutocompleteComponentStore.loading$;
  public readonly series$: Observable<Series[]> = this.kkSeriesAutocompleteComponentStore.series$;
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Self() private readonly kkSeriesAutocompleteComponentStore: KkSearchAutocompleteComponentStore,
    @Self() @Optional() public readonly ngControl: NgControl,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    this.checkIfRequired();

    this.subscriptions.add(
      this.seriesInput$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe((name) => {
        if (name.length > 2)
        this.kkSeriesAutocompleteComponentStore.getSeries({ name });
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onChange: any = () => {
  };

  public onTouch: any = () => {
  };

  public checkIfRequired(): void {
    if (this.ngControl.control?.validator) {
      const validator = this.ngControl.control.validator({} as AbstractControl);
      this.isRequired = !!(validator && validator['required']);
    }
  }

  public writeValue(value: string | number | null): void {
    this.innerValue = value;
    this.registerOnTouched(!!this.onTouch);
  }

  public updateChanges(): void {
    this.onChange(this.innerValue);
  }

  public registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
