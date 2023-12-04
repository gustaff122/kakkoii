import { animate, style, transition, trigger } from '@angular/animations';

export const OpacityAnimation = trigger('opacity', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('100ms 350ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('100ms', style({ opacity: 0 })),
  ]),
]);