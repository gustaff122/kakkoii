import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface DefaultComponentState {
  loading: boolean;
  error: HttpErrorResponse | null;
}

export class DefaultComponentStore<T extends DefaultComponentState> extends ComponentStore<T> {

  public readonly loading$: Observable<boolean> = this.select((state) => state.loading);

  constructor(state: T) {
    super({
      ...state,
      loading: false,
      error: null,
    });
  }
}
