import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { StepperItem } from './models/stepper-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'kk-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: [ './stepper.component.scss' ],
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  @Input() items: StepperItem[] = []
}
