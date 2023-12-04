import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
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
import { LocalStorageProvider } from '@kakkoii/providers/local-storage.provider';

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
    localStorageProvider = inject(LocalStorageProvider),
  ) => ({
    signUpByEmail: rxMethod<{ email: string, login: string, password: string }>(
      pipe(
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
      ),
    ),

    signInByLogin: rxMethod<{ login: string, password: string }>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(({ login, password }) =>
          authService.signIn(login, password).pipe(
            tapResponse({
              next: ({ user, accessToken }) => {
                patchState(store, { user });
                localStorageProvider.setItem('access_token', accessToken);
              },
              error: console.error,
              finalize: () => patchState(store, { loading: false }),
            }),
          ),
        ),
      ),
    ),
  })),
);