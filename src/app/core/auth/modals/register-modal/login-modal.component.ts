import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { InputComponent } from "@kakkoii/ui/atoms/input/input.component";
import { ModalComponent } from "@kakkoii/ui/molecules/modal/modal.component";
import { LogoComponent } from "@kakkoii/ui/atoms/logo/logo.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: "kk-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"],
  imports: [CommonModule, ModalComponent, InputComponent, LogoComponent, ReactiveFormsModule],
  standalone: true,
})
export class LoginModalComponent implements OnInit {
  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public form: FormGroup<LoginForm>;

  private buildForm(): void {
    this.form = this.formBuilder.group<LoginForm>({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
}

