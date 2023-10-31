import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '@kakkoii/ui/molecules/modal/modal.component';

@Component({
  selector: 'kk-register-modal',
  standalone: true,
  imports: [ CommonModule, ModalComponent ],
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterModalComponent {

}
