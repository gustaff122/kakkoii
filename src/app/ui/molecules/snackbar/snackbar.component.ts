import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { SnackbarProvider } from '@kakkoii/providers/snackbar.provider';
import { DropEnterAnimation } from '@kakkoii/animations/drop-enter.animation';

@Component({
  selector: 'kk-snackbar',
  standalone: true,
  imports: [
    NgIconComponent,
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ DropEnterAnimation ],
})
export class SnackbarComponent {

  constructor(
    private readonly snackbarProvider: SnackbarProvider,
  ) {
  }

  public readonly snacks: Signal<string> = computed(() => this.snackbarProvider.snack());
}
