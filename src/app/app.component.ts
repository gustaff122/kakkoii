import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Kakkoii';

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
  }

  public ngOnInit(): void {
    this.document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

    this.subscriptions.add(
      fromEvent(window, 'resize').subscribe(() => {
        this.document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
