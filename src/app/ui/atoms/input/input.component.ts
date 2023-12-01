import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'kk-input',
  standalone: true,
  imports: [ CommonModule, FormsModule, NgIconComponent ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';

  public isRequired: boolean = false;
  public innerValue: string | number = null;
  public touched: boolean = false;

  public isPasswordType: boolean = false;

  constructor(
    @Self() @Optional() public readonly ngControl: NgControl,
  ) {
    this.ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.checkIfRequired();
    this.isPasswordType = (this.type === 'password')
  }

  public checkIfRequired(): void {
    if (this.ngControl.control?.validator) {
      const validator = this.ngControl.control.validator({} as AbstractControl);
      this.isRequired = !!(validator && validator['required']);
    }
  }

  public showPassword(): void {
    this.type = 'text';
  }

  public hidePassword(): void {
    this.type = 'password';
  }

  public writeValue(value: string | number | null): void {
    this.innerValue = value;
    this.registerOnTouched(!!this.onTouch);
  }

  public updateChanges(): void {
    if (this.type === 'number') {
      this.innerValue = parseFloat(this.innerValue as string);

      if (isNaN(this.innerValue)) {
        this.innerValue = null;
      }
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
