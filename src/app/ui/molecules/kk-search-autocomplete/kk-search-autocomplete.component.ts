import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Optional, Renderer2, Self, ViewChild } from '@angular/core';
import { KkSearchAutocompleteComponentStore } from './kk-search-autocomplete.component.store';
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { AbstractControl, FormsModule, NgControl } from '@angular/forms';
import { Series } from '@kakkoii/interfaces/series';
import { Router, RouterLink } from '@angular/router';
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
  @ViewChild('selectComponent') private readonly selectComponent: NgSelectComponent;
  @Input() label: string = '';

  public seriesInput$: Subject<string> = new Subject<string>();
  public phrase: string = ''

  public isRequired: boolean = false;
  public innerValue: string | number = null;

  public readonly loading$: Observable<boolean> = this.kkSeriesAutocompleteComponentStore.loading$;
  public readonly series$: Observable<Series[]> = this.kkSeriesAutocompleteComponentStore.series$;
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Self() private readonly kkSeriesAutocompleteComponentStore: KkSearchAutocompleteComponentStore,
    @Self() @Optional() public readonly ngControl: NgControl,
    private readonly router: Router,
    public readonly renderer2: Renderer2,
    private readonly elementRef: ElementRef
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
        if (name?.length > 2) {
          this.kkSeriesAutocompleteComponentStore.getSeries({ name });
        }

        if (name.length === 0) {
          this.clearState();
        }
      }),
    );
  }

  public setPhrase(search: { term: string, items: any[]}) {
    this.phrase = search.term
  }

  private goToBrowser(): void {
    this.router.navigate(['/browser'], {
      queryParams: { name: this.phrase }
    }).then(() => {
      this.seriesInput$.next('');
      this.innerValue = null;
      this.selectComponent.close()
    })
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public clearState(): void {
    this.kkSeriesAutocompleteComponentStore.clearSeries();
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

  @HostListener('window:keyup', ['$event'])
  public handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const container = this.elementRef.nativeElement.querySelector('.ng-input');
      if (container) {
        const inputElement = this.renderer2.selectRootElement('input', container);
        if (inputElement) {
          inputElement.blur()
          this.goToBrowser()
        }
      }
    }
  }
}
