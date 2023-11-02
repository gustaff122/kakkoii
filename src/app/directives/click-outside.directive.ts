import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[kkClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  @Output() public clickOutside: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private elRef: ElementRef, private zone: NgZone) {
  }

  public ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(document, 'click')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          this.onClick(event);
        });
    });
  }

  public ngOnDestroy(): void {
    this.removeListener();
  }

  public onClick(event: MouseEvent): void {
    if (!event.target) {
      return;
    }

    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.zone.run((): void => {
        this.clickOutside.emit(event);
      });
    }
  }

  private removeListener(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
