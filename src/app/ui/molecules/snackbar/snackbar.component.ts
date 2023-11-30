import { ChangeDetectionStrategy, Component, computed, Input, Signal } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { SnackbarProvider } from '@kakkoii/providers/snackbar.provider';

@Component({
  selector: 'kk-snackbar',
  standalone: true,
  imports: [
    NgIconComponent,
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {

  constructor(
    private readonly snackbarProvider: SnackbarProvider
  ) {
  }

  public readonly snacks: Signal<string> = computed(() => this.snackbarProvider.);
}
