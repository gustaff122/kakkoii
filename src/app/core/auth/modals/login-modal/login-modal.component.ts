import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InputComponent } from '@kakkoii/ui/atoms/input/input.component';
import { ModalComponent } from '@kakkoii/ui/molecules/modal/modal.component';
import { LogoComponent } from '@kakkoii/ui/atoms/logo/logo.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ResetPassModalComponent } from '../reset-pass-modal/reset-pass-modal.component';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'kk-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: [ './login-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ CommonModule, ModalComponent, InputComponent, LogoComponent, ReactiveFormsModule, ResetPassModalComponent ],
  standalone: true,
})
export class LoginModalComponent implements OnInit {
  constructor(private readonly formBuilder: FormBuilder,
              private readonly dialogRef: DialogRef,
              private readonly dialog: Dialog) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public form: FormGroup<LoginForm>;

  private buildForm(): void {
    this.form = this.formBuilder.group<LoginForm>({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  public moveToRegistrationModal(): void {

    import('@kakkoii/core/auth/modals/register-modal/register-modal.component').then(({ RegisterModalComponent }) => {
      this.dialogRef.close();
      this.dialog.open(RegisterModalComponent);
    });


  }

  public openResetPasswordModal(): void {
    console.log('Dupa');
    import('@kakkoii/core/auth/modals/reset-pass-modal/reset-pass-modal.component').then(({ ResetPassModalComponent }) => {
      this.dialogRef.close();
      this.dialog.open(ResetPassModalComponent);
    });
  }
}

