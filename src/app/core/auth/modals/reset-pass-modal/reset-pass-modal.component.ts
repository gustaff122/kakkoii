import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@kakkoii/ui/atoms/input/input.component';
import { LogoComponent } from '@kakkoii/ui/atoms/logo/logo.component';
import { ModalComponent } from '@kakkoii/ui/molecules/modal/modal.component';

interface LoginForm {
  password: FormControl<string>;
}

@Component({
  selector: 'kk-reset-pass-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    InputComponent,
    LogoComponent,
    ModalComponent,
    ReactiveFormsModule,
    InputComponent,
  ],
  templateUrl: './reset-pass-modal.component.html',
  styleUrl: './reset-pass-modal.component.scss',
})
export class ResetPassModalComponent implements OnInit {

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public form: FormGroup<LoginForm>;

  private buildForm(): void {
    this.form = this.formBuilder.group<LoginForm>({
      password: new FormControl(''),
    });
  }

}
