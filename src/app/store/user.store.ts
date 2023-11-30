import { inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import {
  signalStore,
  patchState,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { User } from '@kakkoii/interfaces/user';
import { AuthService } from '@kakkoii/services/auth.service';

type State = { user: User; loading: boolean };

const initialState: State = {
  user: null,
  loading: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    authService = inject(AuthService),
  ) => ({
    signUpByEmail: rxMethod<{ email: string, login: string, password: string }>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { loading: true })),
        switchMap(({ email, login, password }) =>
          authService.signUp(email, login, password).pipe(
            tapResponse({
              next: (user) => patchState(store, { user }),
              error: console.error,
              finalize: () => patchState(store, { loading: false }),
            }),
          ),
        ),
      )),
  })),
);