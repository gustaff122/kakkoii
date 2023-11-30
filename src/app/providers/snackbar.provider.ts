import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarProvider {

  private readonly snack: WritableSignal<string> = signal(null);
  public readonly snack: Signal<string> = signal(null);

  public showErrorSnackbar(message: string): void {

  }
}