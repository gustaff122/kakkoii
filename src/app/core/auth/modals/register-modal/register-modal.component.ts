import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '@kakkoii/ui/molecules/modal/modal.component';
import { StepperComponent } from '@kakkoii/ui/molecules/stepper/stepper.component';
import { StepperItem } from '@kakkoii/ui/molecules/stepper/models/stepper-item';
import { InputComponent } from '@kakkoii/ui/atoms/input/input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '@kakkoii/ui/atoms/checkbox/checkbox.component';
import { UserStore } from '@kakkoii/store/user.store';

interface RegisterForm {
  email: FormControl<string>;
  login: FormControl<string>;
  password: FormControl<string>;
  confirmedPassword: FormControl<string>;
  acceptedPolicy: FormControl<boolean>;
}

@Component({
  selector: 'kk-register-modal',
  standalone: true,
  imports: [ CommonModule, ModalComponent, StepperComponent, InputComponent, ReactiveFormsModule, CheckboxComponent ],
  templateUrl: './register-modal.component.html',
  styleUrls: [ './register-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterModalComponent implements OnInit {

  private readonly userStore = inject(UserStore);

  public readonly steps: StepperItem[] = [
    {
      active: true,
      title: 'Rejestracja',
    },
    {
      active: false,
      title: 'Potwierdzenie maila',
    },
    {
      active: false,
      title: 'Konfiguracja konta',
    },
  ];

  public form: FormGroup<RegisterForm>;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<RegisterForm>({
      email: new FormControl(null),
      login: new FormControl(null),
      password: new FormControl(null),
      confirmedPassword: new FormControl(null),
      acceptedPolicy: new FormControl(false),
    });
  }

  public signUpHandler(): void {
    const { email, login, password } = this.form.getRawValue();
    this.userStore.signUpByEmail({ email, login, password });
  }
}
