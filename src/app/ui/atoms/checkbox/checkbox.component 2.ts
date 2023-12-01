import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';

@Component({
  selector: 'kk-checkbox',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() disabled: boolean = false;
  @Input() label: string = '';

  public isRequired: boolean = false;
  public innerValue: boolean = null;
  public touched: boolean = false;

  constructor(
    @Self() @Optional() public readonly ngControl: NgControl,
  ) {
    this.ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.checkIfRequired();
  }

  public checkIfRequired(): void {
    if (this.ngControl.control?.validator) {
      const validator = this.ngControl.control.validator({} as AbstractControl);
      this.isRequired = !!(validator && validator['required']);
    }
  }

  public writeValue(value: boolean): void {
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
