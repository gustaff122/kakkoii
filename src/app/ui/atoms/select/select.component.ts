import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { SelectComponentStore } from './select.component.store';
import { Observable } from 'rxjs';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'kk-select',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CdkOverlayOrigin,
    AsyncPipe,
    CdkConnectedOverlay,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ SelectComponentStore ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() public placeholder: string = '';
  @Input() public label: string = '';
  @Input() public items: any[] = [];
  @Input() public idKey: string | null = null;
  @Input() public nameKey: string | null = null;

  constructor(
    private readonly selectComponentStore: SelectComponentStore,
  ) {
  }

  public innerValue: string = '';
  public readonly isOpen$: Observable<boolean> = this.selectComponentStore.isOpen$;

  public openHandler(): void {
    this.selectComponentStore.open();
  }

  public closeHandler(): void {
    this.selectComponentStore.close();
  }

  public writeValue(value: string): void {
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

  public onChange: any = (): void => {
  };

  public onTouch: any = (): void => {
  };
}
