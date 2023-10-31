import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '@kakkoii/ui/molecules/modal/modal.component';
import { StepperComponent } from '@kakkoii/ui/molecules/stepper/stepper.component';
import { StepperItem } from '@kakkoii/ui/molecules/stepper/models/stepper-item';

@Component({
  selector: 'kk-register-modal',
  standalone: true,
  imports: [ CommonModule, ModalComponent, StepperComponent ],
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterModalComponent {
  public readonly steps: StepperItem[] = [
    {
      active: true,
      title: 'Rejestracja',
    },
    {
      active: false,
      title: 'Potwierdzenie maila'
    },
    {
      active: false,
      title: 'Konfiguracja konta'
    }
  ]
}
