import { AfterContentInit, Attribute, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, OnDestroy, Output, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { IS_PLATFORM_BROWSER } from '../is-platform-browser.token';

@Component({
  selector: 'kk-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: [ './infinite-scroll.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class InfiniteScrollComponent implements AfterContentInit, OnDestroy {

  @ViewChild('anchorRef', { static: true }) private readonly anchorRef: ElementRef<HTMLDivElement>;

  @Output() public readonly scrolled: EventEmitter<void> = new EventEmitter<void>();

  private observer: IntersectionObserver;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(IS_PLATFORM_BROWSER) private readonly isBrowser: boolean,
    @Attribute('emptyMessage') public readonly emptyMessage: string,
    private readonly elementRef: ElementRef<HTMLElement>,
  ) {
  }

  public ngAfterContentInit(): void {
    if (this.isBrowser) {
      if (window.navigator.onLine && this.isAnchorInView()) {
        this.scrolled.emit();
      }

      this.observer = new IntersectionObserver(
        ([ entry ]) => {
          if (window.navigator.onLine && entry.isIntersecting && this.scrolled.observed) {
            this.scrolled.emit();
          }
        },
        {
          root: this.isHostScrollable() ? this.elementRef.nativeElement : null,
          threshold: 0.1,
        },
      );

      this.observer.observe(this.anchorRef.nativeElement);
    }
  }

  public ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  public errorHandler(): void {
    if (this.isBrowser && window.navigator.onLine && this.scrolled.observed) {
      this.scrolled.emit();
    }
  }

  private isAnchorInView(): boolean {
    if (this.isBrowser && this.anchorRef) {
      const rect = this.anchorRef.nativeElement.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || this.document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || this.document.documentElement.clientWidth)
      );
    } else {
      return false;
    }
  }

  private isHostScrollable(): boolean {
    if (this.isBrowser) {
      const style: CSSStyleDeclaration = window.getComputedStyle(this.elementRef.nativeElement);

      return style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll';
    } else {
      return false;
    }
  }
}