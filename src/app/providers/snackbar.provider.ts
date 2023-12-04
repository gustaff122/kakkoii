import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarProvider {

  private readonly _snack: WritableSignal<string> = signal(null);
  public readonly snack: Signal<string> = computed(() => this._snack());

  public showErrorSnackbar(message: string): void {
    this._snack.set(message);

    setTimeout(() => {
      this._snack.set(null);
    }, 5000);
  }
}