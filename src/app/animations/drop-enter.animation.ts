import {
  animate,
  sequence,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const DropEnterAnimation = trigger('dropEnter', [
  transition(':enter', [
    style({ 'transform': 'scale(1.05) translateY(-35px)', 'opacity': 0 }),
    sequence([
      animate('200ms 300ms', style({ 'transform': 'scale(1) translateY(0)', 'opacity': 1 })),
    ]),
  ]),

  transition(':leave', [
    style({ 'transform': 'scale(1) translateY(0)' }),
    sequence([
      animate('200ms', style({ 'transform': 'scale(1.05) translateY(-15px)', 'opacity': 0 })),
    ]),
  ]),
]);
