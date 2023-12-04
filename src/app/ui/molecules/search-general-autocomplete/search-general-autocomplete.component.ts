import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchGeneralAutocompleteComponentStore } from './search-general-autocomplete.component.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { NgIconComponent } from '@ng-icons/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { OpacityAnimation } from '@kakkoii/animations/opacity.animation';
import { Series } from '@kakkoii/interfaces/series';
import { Router, RouterLink } from '@angular/router';

interface Form {
  name: FormControl<string>;
}

@Component({
  selector: 'kk-search-general-autocomplete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIconComponent,
    CdkConnectedOverlay,
    AsyncPipe,
    CdkOverlayOrigin,
    NgTemplateOutlet,
    NgClass,
    RouterLink,
  ],
  templateUrl: './search-general-autocomplete.component.html',
  styleUrl: './search-general-autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ OpacityAnimation ],
  providers: [
    SearchGeneralAutocompleteComponentStore,
  ],
})
export class SearchGeneralAutocompleteComponent implements OnInit {
  @ViewChild('input') private readonly input: ElementRef<HTMLElement>;

  public form: FormGroup<Form>;
  public readonly isOpen$: Observable<boolean> = this.searchGeneralAutocompleteComponentStore.isOpen$;
  public readonly hasSeries$: Observable<boolean> = this.searchGeneralAutocompleteComponentStore.hasSeries$;
  public readonly series$: Observable<Series[]> = this.searchGeneralAutocompleteComponentStore.series$;

  constructor(
    private readonly searchGeneralAutocompleteComponentStore: SearchGeneralAutocompleteComponentStore,
    private readonly formBuilder: FormBuilder,
    private readonly destroyRef: DestroyRef,
    private readonly router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
    this.initFormListener();
  }

  public goToBrowser(): void {
    const { name } = this.form.getRawValue();

    this.router.navigate([ '/browser' ], {
      queryParams: { name },
    }).then(() => {
      this.form.patchValue({ name: '' });
      this.closeHandler();

      this.input.nativeElement.blur();
    });
  }

  public openOnFocus(): void {
    const { name } = this.form.getRawValue();

    if (name.length > 2) {
      this.searchGeneralAutocompleteComponentStore.open();
    }
  }

  public closeHandler(): void {
    this.searchGeneralAutocompleteComponentStore.close();
  }

  public closeHandlerWithTimeout(): void {
    setTimeout(() => {
      this.closeHandler();
    }, 200);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(null),
    });
  }

  private initFormListener(): void {
    this.form.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(({ name }) => {
      if (name?.length > 2) {
        this.searchGeneralAutocompleteComponentStore.getSeries({
          name, callbackFn: () => {
            this.searchGeneralAutocompleteComponentStore.open();
          },
        });
      }

      if (name.length === 0) {
        this.searchGeneralAutocompleteComponentStore.clearSeries();
        this.searchGeneralAutocompleteComponentStore.close();
      }
    });
  }
}
