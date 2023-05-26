import {
  transition,
  trigger,
  query,
  style,
  animate,
} from '@angular/animations';

export const opacityAnimation =
  trigger('opacityAnimation', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          opacity: 0,
        }),
      ], { optional: true }),
      query(':enter', [
        animate('400ms ease', style({ opacity: 1 })),
      ], { optional: true })
    ]),
  ]);
