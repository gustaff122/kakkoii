import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';

interface SelectComponentState extends DefaultComponentState {
  isOpen: boolean;
}

@Injectable()
export class SelectComponentStore extends DefaultComponentStore<SelectComponentState> {

  public readonly isOpen$: Observable<boolean> = this.select((state) => state.isOpen);

  public readonly open = this.updater((state): SelectComponentState => {
    return {
      ...state,
      isOpen: true,
    };
  });

  public readonly close = this.updater((state): SelectComponentState => {
    return {
      ...state,
      isOpen: false,
    };
  });

  constructor() {
    super({
      isOpen: false,
      loading: false,
      error: null,
    });
  }
}