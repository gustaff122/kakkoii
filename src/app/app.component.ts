import { Component, computed, Inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
import { SnackbarProvider } from '@kakkoii/providers/snackbar.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private progressRef: NgProgressRef;

  public readonly snack: Signal<string> = computed(() => this.snackbarProvider.snack());

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly ngProgress: NgProgress,
    private readonly router: Router,
    private readonly snackbarProvider: SnackbarProvider,
  ) {
  }

  public ngOnInit(): void {
    this.initResizeListener();
    this.initRoutingListener();
  }


  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initResizeListener(): void {
    this.document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

    this.subscriptions.add(
      fromEvent(window, 'resize').subscribe(() => {
        this.document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      }),
    );
  }

  private initRoutingListener(): void {
    this.progressRef = this.ngProgress.ref('routingProgress');

    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.progressRef.start();
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.progressRef.complete();
            break;
          }
          default: {
            break;
          }
        }
      }),
    );
  }

}
