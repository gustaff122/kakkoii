import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '@kakkoii/ui/atoms/input/input.component';
import { ModalComponent } from '@kakkoii/ui/molecules/modal/modal.component';
import { LogoComponent } from '@kakkoii/ui/atoms/logo/logo.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserStore } from '@kakkoii/store/user.store';

interface LoginForm {
  login: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'kk-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: [ './login-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ CommonModule, ModalComponent, InputComponent, LogoComponent, ReactiveFormsModule ],
  standalone: true,
})
export class LoginModalComponent implements OnInit {

  private readonly userStore = inject(UserStore);

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public form: FormGroup<LoginForm>;

  private buildForm(): void {
    this.form = this.formBuilder.group<LoginForm>({
      login: new FormControl(''),
      password: new FormControl(''),
    });
  }

  public loginHandler(): void {
    this.userStore.signInByLogin(this.form.getRawValue());
  }
}

