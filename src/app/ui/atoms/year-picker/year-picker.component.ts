import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectionPositionPair } from '@angular/cdk/overlay';
import { ClickOutsideDirective } from '@kakkoii/directives/click-outside.directive';
import { NgScrollbar, ScrollViewport } from 'ngx-scrollbar';

@Component({
  selector: 'kk-year-picker',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, NgIconComponent, CdkOverlayOrigin, CdkConnectedOverlay, ClickOutsideDirective, NgScrollbar, ScrollViewport ],
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearPickerComponent implements ControlValueAccessor, OnInit {
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() label: string = '';

  public isRequired: boolean = false;
  public innerValue: number = null;
  public touched: boolean = false;
  public isOpen: boolean = false;

  public years: number[] = [];

  public readonly position: ConnectionPositionPair[] = [
    {
      offsetX: 0,
      offsetY: 75,
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      panelClass: null,
    },
  ];

  constructor(
    @Self() @Optional() public readonly ngControl: NgControl,
  ) {
    this.ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.checkIfRequired();
    this.setUpYears()
  }

  private setUpYears(): void {
    for (let year = 1970; year <= 2023; year++) {
      this.years.push(year);
    }

    this.years.reverse()
  }

  public openHandler(): void {
    this.isOpen = true;
  }

  public closeHandler(): void {
    this.isOpen = false;
  }

  public selectYear(year: number): void {
    this.writeValue(year);
    this.updateChanges();
  }

  public checkIfRequired(): void {
    if (this.ngControl.control?.validator) {
      const validator = this.ngControl.control.validator({} as AbstractControl);
      this.isRequired = !!(validator && validator['required']);
    }
  }

  public writeValue(value: number | null): void {
    this.innerValue = value;
    this.registerOnTouched(!!this.onTouch);
  }

  public updateChanges(): void {
    if (isNaN(this.innerValue)) {
      this.innerValue = null;
    }

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
